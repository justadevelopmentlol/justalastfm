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
  )
  .addSubcommand((subcommand) => subcommand
    .setName("login")
    .setDescription("Verknüpfe deinen Last.fm-Account"))
  .addSubcommand((subcommand) => subcommand
    .setName("logout")
    .setDescription("Entferne deine Last.fm-Verknüpfung"));
