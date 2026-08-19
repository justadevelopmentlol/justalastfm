import { ButtonStyle, InteractionReplyOptions, MessageFlags, escapeMarkdown } from "discord.js";
import { EmojiRegistry } from "./application-emojis.js";
import { LastFmTrack } from "./lastfm.js";

const white = 0xffffff;

function card(components: Array<Record<string, unknown>>): InteractionReplyOptions {
  return {
    flags: MessageFlags.IsComponentsV2,
    components: [{ type: 17, accent_color: white, components }] as never
  };
}

function text(content: string): Record<string, unknown> {
  return { type: 10, content };
}

function actionButton(
  label: string,
  customId: string,
  style: ButtonStyle,
  emoji?: { id: string; name: string }
): Record<string, unknown> {
  return {
    type: 2,
    style,
    label,
    custom_id: customId,
    ...(emoji ? { emoji } : {})
  };
}

function number(value: number | null): string {
  return value === null ? "—" : new Intl.NumberFormat("en-US").format(value);
}

export function connectCard(emojis: EmojiRegistry): InteractionReplyOptions {
  return card([
    text("# **Connect your Last.fm**"),
    text("Enter your Last.fm username to connect your account."),
    { type: 14, divider: true, spacing: 1 },
    {
      type: 1,
      components: [
        actionButton(
          "Connect Last.fm",
          "fm:connect",
          ButtonStyle.Secondary,
          emojis.button("fm_lastfm")
        )
      ]
    },
    text("Use `/fm-logout` to disconnect your account.")
  ]);
}

export function logoutCard(): InteractionReplyOptions {
  return card([
    text("# **Last.fm logout**"),
    text("Your Last.fm account was disconnected.")
  ]);
}

export function trackCard(track: LastFmTrack, emojis: EmojiRegistry): InteractionReplyOptions {
  const song = escapeMarkdown(track.name);
  const artist = escapeMarkdown(track.artist);
  const album = track.album ? escapeMarkdown(track.album) : "Unknown album";
  const status = track.nowPlaying ? "Playing now" : "Last played";
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
