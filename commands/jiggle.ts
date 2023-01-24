import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import fs from 'fs'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jiggle')
		.setDescription('Sends a random image of pouya'),
	async execute(interaction : ChatInputCommandInteraction) {
		await fs.readdir('./assets', (err, files) => {
            if (err) {
                console.error(err);
                return;
            }   
            const randomFile = files[Math.floor(Math.random() * files.length)];
            interaction.editReply({
                files: [`./assets/${randomFile}`]
            });
        });
	},
};