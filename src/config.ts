import "dotenv/config";
import { resolve } from "node:path";

function required(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const config = {
  discordToken: required("DISCORD_TOKEN"),
  discordClientId: required("DISCORD_CLIENT_ID"),
  lastFmApiKey: required("LASTFM_API_KEY"),
  dataFile: resolve(process.env.DATA_FILE?.trim() || "data/accounts.json")
};
