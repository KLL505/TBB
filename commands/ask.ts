import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import fetch from 'cross-fetch';
const simpleWolframAPI = "http://api.wolframalpha.com/v1/result?appid=" + process.env.WOLFRAMAPPID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Ask the bot a question resulting in a simple answer')
        .addStringOption(option => 
            option.setName('question').setDescription('The question you want answered').setRequired(true)),

	async execute(interaction : ChatInputCommandInteraction) {
        await interaction.deferReply();
        var question : string = interaction.options.getString('question') ?? "";
        var query : string = simpleWolframAPI + "&i=" + encodeURIComponent(question); 
        console.log("Ask: "+ query);
        fetch (query).then(res => {
            return res.text()
        }).then(async data => {
            if(data == 'Wolfram|Alpha did not understand your input')
                data = "I can't answer that question, ask pouya"
            await interaction.editReply({
                content:`Q: ${question}\n\n${data}`
            })
        });
	},
};