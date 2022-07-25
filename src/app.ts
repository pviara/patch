import {
    ActionRowBuilder,
    Client,
    Message,
    SelectMenuBuilder,
    SelectMenuInteraction,
} from 'discord.js';
import { ConfigService } from './infrastructure/config.service';
import { RoleService } from './role/role.service';
import {
    campusQuestion,
    courseQuestion,
    Question,
    semesterQuestion,
    specialQuestion,
} from './question/question';

const client = new Client({ intents: ['Guilds', 'GuildMessages'] });

client.once('ready', async () => {
    console.log('Ready!');
});

client.on('messageCreate', async (message) => {
    if (message.author.id === ConfigService.appId) {
        return;
    }
    
    const menu = new SelectMenuBuilder()
        .setCustomId('specialQuestion')
        .setPlaceholder('Sélectionne ton statut...')
        .addOptions(
            specialQuestion.options.map((option) => ({
                label: option.label,
                value: option.label,
            })),
        );

    const row = new ActionRowBuilder<typeof menu>().addComponents(menu);
    
    await message.author.send({
        content: specialQuestion.text,
        components: [row]
    });
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isSelectMenu()) {
        return;
    }

    const { customId, values } = interaction;
    const [selected] = values;

    interaction.message.edit({
        content: `Tu as répondu "${selected}"`,
        components: []
    });

    switch (customId) {
        case 'specialQuestion': {
            if (selected === 'Étudiant') {
                await replyWithSelectMenuTo(
                    interaction,
                    'campusQuestion',
                    campusQuestion,
                    'Sélectionne ton campus...',
                );
                break;
            }

            await interaction.reply({
                content:
                    "Merci pour ta réponse. Je t'ai assigné le rôle qu'il te faut !",
            });
            break;
        }

        case 'campusQuestion': {
            await replyWithSelectMenuTo(
                interaction,
                'semesterQuestion',
                semesterQuestion,
                'Sélectionne ton semestre...',
            );
            break;
        }

        case 'semesterQuestion': {
            if (selected.includes('S1') || selected.includes('S2')) {
                await interaction.reply({
                    content:
                        "Terminé ! Je me suis occupé de te donner tous les rôles qu'il te faut.",
                });
                break;
            }

            await replyWithSelectMenuTo(
                interaction,
                'courseQuestion',
                courseQuestion,
                'Sélectionne ta filière...',
            );
            break;
        }

        case 'courseQuestion': {
            await interaction.reply({
                content:
                    "Terminé ! Je me suis occupé de te donner tous les rôles qu'il te faut.",
            });
            break;
        }

        default: {
            break;
        }
    }
});

client.login(ConfigService.botToken);

async function replyWithSelectMenuTo(
    interaction: SelectMenuInteraction,
    customId: string,
    question: Question,
    placeholder: string,
) {
    const menu = new SelectMenuBuilder()
        .setCustomId(customId)
        .setPlaceholder(placeholder)
        .addOptions(
            question.options.map((option) => ({
                label: option.label,
                value: option.label,
            })),
        );

    const row = new ActionRowBuilder<typeof menu>().addComponents(menu);

    await interaction.reply({
        content: question.text,
        components: [row],
    });
}
