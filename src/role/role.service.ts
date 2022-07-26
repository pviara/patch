import { ConfigService } from '../infrastructure/config.service';
import { PartialRoleData, Routes } from 'discord.js';
import { RESTService } from '../infrastructure/rest.service';

export class RoleService {
    private static roles: PartialRoleData[] = [];

    static async assignRole(memberId: string, roleName: string): Promise<void> {
        const match = this.roles.find((role) => role.name === roleName);
        if (!match?.id) {
            return;
        }

        await RESTService.put(
            Routes.guildMemberRole(
                ConfigService.guildId,
                memberId,
                match.id.toString(),
            ),
        );
    }

    static async setupRoles(): Promise<void> {
        this.roles = (await RESTService.get(
            Routes.guildRoles(ConfigService.guildId),
        )) as PartialRoleData[];
    }
}
