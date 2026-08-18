import { REST, Routes } from "discord.js";
import { config } from "./config.js";
import { fmCommand } from "./commands.js";

const rest = new REST({ version: "10" }).setToken(config.discordToken);

await rest.put(Routes.applicationCommands(config.discordClientId), {
  body: [fmCommand.toJSON()]
});

console.log("Registered /fm as a global user-install command.");
