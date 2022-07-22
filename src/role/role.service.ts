import { ConfigService } from '../infrastructure/config.service';
import { RESTService } from '../infrastructure/rest.service';
import { RoleData, Routes } from 'discord.js';

export class RoleService {
    static async getGuildRoles(): Promise<RoleData[]> {
        const roles = (await RESTService.get(
            Routes.guildRoles(ConfigService.guildId),
        )) as RoleData[];

        return this.filterRoles(roles);
    }

    private static filterRoles(roles: RoleData[]): RoleData[] {
        return roles.filter((role) => !this.isSecuredRole(role));
    }

    private static isSecuredRole(role: RoleData): boolean {
        if (!role.name) {
            return true;
        }

        return role.name?.startsWith('_') || role.name?.startsWith('@');
    }
}
