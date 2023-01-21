import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
const simpleWolframAPI = "http://api.wolframalpha.com/v1/result?appid=" + process.env.WOLFRAMAPPID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Ask the bot a question resulting in a simple answer')
        .addStringOption(option => 
            option.setName('question').setDescription('The question you want answered').setRequired(true)),

	async execute(interaction : ChatInputCommandInteraction) {
        var question : string = interaction.options.getString('question') ?? "";
        var query : string = simpleWolframAPI + "&i=" + encodeURIComponent(question); 
        fetch (query).then(res => {
            return res.text()
        }).then(data => {
            interaction.reply({
                content:`Q: ${question}\nA: ${data}`
            })
        });
	},
};