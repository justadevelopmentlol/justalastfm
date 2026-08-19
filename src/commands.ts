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
  .setDescription("Verknüpfe deinen Last.fm-Account")
  .setIntegrationTypes(ApplicationIntegrationType.UserInstall)
  .setContexts(
    InteractionContextType.Guild,
    InteractionContextType.BotDM,
    InteractionContextType.PrivateChannel
  );

export const fmLogoutCommand = new SlashCommandBuilder()
  .setName("fm-logout")
  .setDescription("Entferne deine Last.fm-Verknüpfung")
  .setIntegrationTypes(ApplicationIntegrationType.UserInstall)
  .setContexts(
    InteractionContextType.Guild,
    InteractionContextType.BotDM,
    InteractionContextType.PrivateChannel
  );
