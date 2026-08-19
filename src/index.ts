import {
  ActionRowBuilder,
  Client,
  Events,
  GatewayIntentBits,
  MessageFlags,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} from "discord.js";
import { AccountStore } from "./account-store.js";
import { EmojiRegistry } from "./application-emojis.js";
import { connectCard, trackCard } from "./cards.js";
import { config } from "./config.js";
import { LastFmClient } from "./lastfm.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const accounts = new AccountStore(config.dataFile);
const lastFm = new LastFmClient(config.lastFmApiKey);
const emojis = new EmojiRegistry();

function loginModal(): ModalBuilder {
  const username = new TextInputBuilder()
    .setCustomId("lastfm-username")
    .setLabel("Last.fm Username")
    .setPlaceholder("z. B. hauntgg")
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setMinLength(1)
    .setMaxLength(64);

  return new ModalBuilder()
    .setCustomId("fm:login-modal")
    .setTitle("Connect Last.fm")
    .addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(username));
}

async function showFm(discordId: string) {
  const account = accounts.get(discordId);

  if (!account) {
    return connectCard();
  }

  const track = await lastFm.getLatestTrack(account.lastFmUsername);
  return trackCard(track, emojis, discordId);
}

function errorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : "Unbekannter Fehler";
  return `Last.fm konnte nicht geladen werden: ${message}`;
}

await accounts.load();

client.once(Events.ClientReady, async (readyClient) => {
  try {
    await emojis.sync(config.discordToken, config.discordClientId);
    console.log("Application emojis are ready.");
  } catch (error) {
    console.error("Application emoji sync failed:", error);
  }

  console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isChatInputCommand() && interaction.commandName === "fm") {
      const subcommand = interaction.options.getSubcommand(false);

      if (subcommand === "login") {
        await interaction.reply(connectCard());
        return;
      }

      if (subcommand === "logout") {
        const removed = await accounts.delete(interaction.user.id);
        await interaction.reply({
          content: removed
            ? "Deine Last.fm-Verknüpfung wurde entfernt."
            : "Du hast keinen verknüpften Last.fm-Account.",
          flags: MessageFlags.Ephemeral
        });
        return;
      }

      const payload = await showFm(interaction.user.id);
      await interaction.reply(payload);
      return;
    }

    if (interaction.isButton()) {
      if (interaction.customId === "fm:connect") {
        await interaction.showModal(loginModal());
        return;
      }

      if (interaction.customId.startsWith("fm:refresh:")) {
        const ownerDiscordId = interaction.customId.slice("fm:refresh:".length);

        if (ownerDiscordId !== interaction.user.id) {
          await interaction.reply({
            content: "Diese Karte gehört einem anderen Discord-Account. Nutze `/fm` für deine eigene Karte.",
            flags: MessageFlags.Ephemeral
          });
          return;
        }

        await interaction.deferUpdate();
        const payload = await showFm(interaction.user.id);
        const { flags: _, ...editPayload } = payload;
        await interaction.editReply(editPayload);
      }

      return;
    }

    if (interaction.isModalSubmit() && interaction.customId === "fm:login-modal") {
      const username = interaction.fields.getTextInputValue("lastfm-username").trim();

      if (!/^[^\s]{1,64}$/.test(username)) {
        await interaction.reply({
          content: "Bitte gib einen gültigen Last.fm-Username ohne Leerzeichen ein.",
          flags: MessageFlags.Ephemeral
        });
        return;
      }

      await lastFm.validateUsername(username);
      await accounts.set(interaction.user.id, username);
      const payload = await showFm(interaction.user.id);
      await interaction.reply(payload);
    }
  } catch (error) {
    console.error(error);

    if (interaction.isRepliable() && !interaction.replied && !interaction.deferred) {
      await interaction.reply({ content: errorMessage(error), flags: MessageFlags.Ephemeral });
      return;
    }

    if (interaction.isRepliable()) {
      await interaction.followUp({ content: errorMessage(error), flags: MessageFlags.Ephemeral });
    }
  }
});

await client.login(config.discordToken);
