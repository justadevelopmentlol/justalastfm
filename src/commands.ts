import {
  ApplicationIntegrationType,
  InteractionContextType,
  SlashCommandBuilder
} from "discord.js";

export const fmCommand = new SlashCommandBuilder()
  .setName("fm")
  .setDescription("Zeigt deinen aktuellen oder letzten Last.fm-Track")
  .setIntegrationTypes(ApplicationIntegrationType.UserInstall)
  .setContexts(
    InteractionContextType.Guild,
    InteractionContextType.BotDM,
    InteractionContextType.PrivateChannel
  );
