import { REST, Routes } from "discord.js";

type ApplicationEmoji = {
  id: string;
  name: string;
};

type ApplicationEmojiList = {
  items: ApplicationEmoji[];
};

const emojiUrls = {
  fm_mic: "https://cloud.ryz.wtf/microphone.png",
  fm_album: "https://cloud.ryz.wtf/album.png",
  fm_wave: "https://cloud.ryz.wtf/wave.png"
} as const;

export class EmojiRegistry {
  private readonly ids = new Map<string, string>();

  async sync(token: string, applicationId: string): Promise<void> {
    const rest = new REST({ version: "10" }).setToken(token);
    const route = Routes.applicationEmojis(applicationId);
    const existing = (await rest.get(route) as ApplicationEmojiList).items;

    for (const name of Object.keys(emojiUrls)) {
      const found = existing.find((emoji) => emoji.name === name);

      if (found) {
        this.ids.set(name, found.id);
        continue;
      }

      const image = await this.download(name as keyof typeof emojiUrls);
      const created = await rest.post(route, {
        body: {
          name,
          image: `data:image/png;base64,${image}`
        }
      }) as ApplicationEmoji;
      this.ids.set(name, created.id);
    }
  }

  text(name: keyof typeof emojiUrls, fallback: string): string {
    const id = this.ids.get(name);
    return id ? `<:${name}:${id}>` : fallback;
  }

  private async download(name: keyof typeof emojiUrls): Promise<string> {
    const response = await fetch(emojiUrls[name]);

    if (!response.ok) {
      throw new Error(`Could not download ${name}: HTTP ${response.status}`);
    }

    return Buffer.from(await response.arrayBuffer()).toString("base64");
  }
}
