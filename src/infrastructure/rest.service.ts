import { ConfigService } from './config.service';
import { REST } from '@discordjs/rest';

export const RESTService = new REST({ version: '10' }).setToken(
    ConfigService.botToken,
);
