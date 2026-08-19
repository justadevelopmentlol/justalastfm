import { REST, Routes } from "discord.js";
import { config } from "./config.js";
import { fmCommand, fmLoginCommand, fmLogoutCommand } from "./commands.js";

const rest = new REST({ version: "10" }).setToken(config.discordToken);

await rest.put(Routes.applicationCommands(config.discordClientId), {
  body: [fmCommand.toJSON(), fmLoginCommand.toJSON(), fmLogoutCommand.toJSON()]
});

console.log("Registered /fm as a global user-install command.");
