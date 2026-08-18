export type LastFmTrack = {
  name: string;
  artist: string;
  album: string | null;
  imageUrl: string | null;
  url: string;
  nowPlaying: boolean;
  scrobbles: number | null;
  userPlayCount: number | null;
};

type LastFmApiError = {
  error: number;
  message: string;
};

type RecentTrack = {
  name: string;
  url: string;
  artist: { "#text": string };
  album?: { "#text": string };
  image?: Array<{ size: string; "#text": string }>;
  "@attr"?: { nowplaying?: string };
};

export class LastFmClient {
  constructor(private readonly apiKey: string) {}

  async getLatestTrack(username: string): Promise<LastFmTrack> {
    const recent = await this.request<{ recenttracks: { track: RecentTrack[] | RecentTrack } }>(
      "user.getrecenttracks",
      { user: username, limit: "1" }
    );
    const track = Array.isArray(recent.recenttracks.track)
      ? recent.recenttracks.track[0]
      : recent.recenttracks.track;

    if (!track) {
      throw new Error("No scrobbles found for this Last.fm account.");
    }

    const [userInfo, trackInfo] = await Promise.all([
      this.request<{ user: { playcount: string } }>("user.getinfo", { user: username }),
      this.request<{ track: { userplaycount?: string } }>("track.getinfo", {
        artist: track.artist["#text"],
        track: track.name,
        username
      }).catch((): { track: { userplaycount?: string } } => ({ track: {} }))
    ]);
    const image = track.image?.find((entry) => entry.size === "extralarge" && entry["#text"])
      ?? track.image?.find((entry) => entry.size === "large" && entry["#text"])
      ?? track.image?.find((entry) => entry["#text"]);

    return {
      name: track.name,
      artist: track.artist["#text"],
      album: track.album?.["#text"] || null,
      imageUrl: image?.["#text"] || null,
      url: track.url,
      nowPlaying: track["@attr"]?.nowplaying === "true",
      scrobbles: this.toNumber(userInfo.user.playcount),
      userPlayCount: this.toNumber(trackInfo.track.userplaycount)
    };
  }

  async validateUsername(username: string): Promise<void> {
    await this.request<{ user: { name: string } }>("user.getinfo", { user: username });
  }

  private async request<T extends object>(method: string, params: Record<string, string> = {}): Promise<T> {
    const query = new URLSearchParams({ method, api_key: this.apiKey, format: "json", ...params });
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${query}`);
    const data = await response.json() as T | LastFmApiError;

    if (!response.ok || this.isError(data)) {
      const message = this.isError(data) ? data.message : "Last.fm could not be reached.";
      throw new Error(message);
    }

    return data;
  }

  private toNumber(value: string | undefined): number | null {
    if (!value) {
      return null;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private isError(data: object): data is LastFmApiError {
    return "error" in data && "message" in data;
  }
}
