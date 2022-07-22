import { Client } from 'discord.js';
import { ConfigService } from './infrastructure/config.service';
import { RoleService } from './role/role.service';

const client = new Client({ intents: ['Guilds'] });

client.once('ready', async () => {
    const roles = await RoleService.getGuildRoles();
    console.log(roles.map((role) => role.name));
});

client.login(ConfigService.botToken);
