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

export const fmLoginCommand = new SlashCommandBuilder()
  .setName("fm-login")
  .setDescription("Connect your Last.fm account")
  .setIntegrationTypes(ApplicationIntegrationType.UserInstall)
  .setContexts(
    InteractionContextType.Guild,
    InteractionContextType.BotDM,
    InteractionContextType.PrivateChannel
  );

export const fmLogoutCommand = new SlashCommandBuilder()
  .setName("fm-logout")
  .setDescription("Disconnect your Last.fm account")
  .setIntegrationTypes(ApplicationIntegrationType.UserInstall)
  .setContexts(
    InteractionContextType.Guild,
    InteractionContextType.BotDM,
    InteractionContextType.PrivateChannel
  );
