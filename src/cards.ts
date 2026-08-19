import { ButtonStyle, InteractionReplyOptions, MessageFlags, escapeMarkdown } from "discord.js";
import { EmojiRegistry } from "./application-emojis.js";
import { LastFmTrack } from "./lastfm.js";

const pink = 0xf276ae;

function card(components: Array<Record<string, unknown>>): InteractionReplyOptions {
  return {
    flags: MessageFlags.IsComponentsV2,
    components: [{ type: 17, accent_color: pink, components }] as never
  };
}

function text(content: string): Record<string, unknown> {
  return { type: 10, content };
}

function actionButton(label: string, customId: string, style: ButtonStyle): Record<string, unknown> {
  return {
    type: 2,
    style,
    label,
    custom_id: customId
  };
}

function number(value: number | null): string {
  return value === null ? "—" : new Intl.NumberFormat("en-US").format(value);
}

export function connectCard(): InteractionReplyOptions {
  return card([
    text("# **Connect your Last.fm**"),
    text("Click **Connect Last.fm** below and enter your Last.fm username."),
    { type: 14, divider: true, spacing: 1 },
    {
      type: 1,
      components: [actionButton("Connect Last.fm", "fm:connect", ButtonStyle.Primary)]
    },
    text("Once linked, your account will be connected to Discord. Use `/fm logout` to remove it at any time.")
  ]);
}

export function logoutCard(): InteractionReplyOptions {
  return card([
    text("# **Last.fm logout**"),
    text("Deine Last.fm-Verknüpfung wurde erfolgreich entfernt.")
  ]);
}

export function trackCard(track: LastFmTrack, emojis: EmojiRegistry): InteractionReplyOptions {
  const song = escapeMarkdown(track.name);
  const artist = escapeMarkdown(track.artist);
  const album = track.album ? escapeMarkdown(track.album) : "Unbekanntes Album";
  const status = track.nowPlaying ? "Spielt jetzt" : "Zuletzt gespielt";
  const trackLine = `${emojis.text("fm_mic", "🎙️")} **${artist}**\n${emojis.text("fm_album", "💿")} **${album}**\n${emojis.text("fm_wave", "🎚️")} ${number(track.scrobbles)} Scrobbles · ${number(track.userPlayCount)} Song Plays`;
  const section: Record<string, unknown> = {
    type: 9,
    components: [text(`## [${song}](${track.url})\n${status}\n\n${trackLine}`)]
  };

  if (track.imageUrl) {
    section.accessory = {
      type: 11,
      media: { url: track.imageUrl }
    };
  }

  return card([
    section
  ]);
}
