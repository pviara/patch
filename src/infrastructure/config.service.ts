import 'dotenv/config';

export class ConfigService {
    static get appId(): string {
        return this.getFromEnvFile('APP_ID');
    }

    static get guildId(): string {
        return this.getFromEnvFile('GUILD_ID');
    }

    static get botToken(): string {
        return this.getFromEnvFile('BOT_TOKEN');
    }

    private static getFromEnvFile(key: string): string {
        const value = process.env[key];
        if (!value) {
            throw new Error(`Could not retrieve "${key}" from env file`);
        }

        return value;
    }
}
