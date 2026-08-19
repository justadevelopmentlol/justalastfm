import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { REST, Routes } from "discord.js";

type ApplicationEmoji = {
  id: string;
  name: string;
};

type ApplicationEmojiList = {
  items: ApplicationEmoji[];
};

const emojiFiles = {
  fm_mic: "microphone.webp",
  fm_album: "album.webp",
  fm_wave: "wave.webp"
} as const;

export class EmojiRegistry {
  private readonly ids = new Map<string, string>();

  async sync(token: string, applicationId: string): Promise<void> {
    const rest = new REST({ version: "10" }).setToken(token);
    const route = Routes.applicationEmojis(applicationId);
    const existing = (await rest.get(route) as ApplicationEmojiList).items;

    for (const name of Object.keys(emojiFiles)) {
      const found = existing.find((emoji) => emoji.name === name);

      if (found) {
        this.ids.set(name, found.id);
        continue;
      }

      const image = await readFile(join(process.cwd(), "assets", "emojis", emojiFiles[name as keyof typeof emojiFiles]));
      const created = await rest.post(route, {
        body: {
          name,
          image: `data:image/webp;base64,${image.toString("base64")}`
        }
      }) as ApplicationEmoji;
      this.ids.set(name, created.id);
    }
  }

  text(name: keyof typeof emojiFiles, fallback: string): string {
    const id = this.ids.get(name);
    return id ? `<:${name}:${id}>` : fallback;
  }
}
