import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export type LinkedAccount = {
  discordId: string;
  lastFmUsername: string;
  linkedAt: string;
};

type AccountFile = {
  accounts: Record<string, LinkedAccount>;
};

export class AccountStore {
  private accounts = new Map<string, LinkedAccount>();

  constructor(private readonly filePath: string) {}

  async load(): Promise<void> {
    try {
      const contents = await readFile(this.filePath, "utf8");
      const parsed = JSON.parse(contents) as AccountFile;
      this.accounts = new Map(Object.entries(parsed.accounts ?? {}));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }
  }

  get(discordId: string): LinkedAccount | undefined {
    return this.accounts.get(discordId);
  }

  async set(discordId: string, lastFmUsername: string): Promise<LinkedAccount> {
    const account = {
      discordId,
      lastFmUsername,
      linkedAt: new Date().toISOString()
    };

    this.accounts.set(discordId, account);
    await this.persist();
    return account;
  }

  async delete(discordId: string): Promise<boolean> {
    const removed = this.accounts.delete(discordId);

    if (removed) {
      await this.persist();
    }

    return removed;
  }

  private async persist(): Promise<void> {
    await mkdir(dirname(this.filePath), { recursive: true });
    const temporaryPath = `${this.filePath}.tmp`;
    const body: AccountFile = { accounts: Object.fromEntries(this.accounts) };
    await writeFile(temporaryPath, `${JSON.stringify(body, null, 2)}\n`, "utf8");
    await rename(temporaryPath, this.filePath);
  }
}
