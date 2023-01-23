import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import xml2js from 'xml2js';

const solveWolframAPI = "https://api.wolframalpha.com/v2/query?&podstate=Result__Step-by-step%20solution&format=image&appid=" + process.env.WOLFRAMAPPID;


function parseXML(xml : string):string[]{
    var images : string[] = [];
    xml2js.parseString(xml, (err :Error | null, result: any) => {
        if (err) {
            console.error(err);
            return;
        }
        images = result.queryresult.pod.map((x : any)=>x.subpod.map((y : any )=>y.img[0].$.src)).flat();
    });
    return images;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('solve')
		.setDescription('asks bot to solve a math equation')
        .addStringOption(option => 
            option.setName('question').setDescription('The question you want answered').setRequired(true)),

	async execute(interaction : ChatInputCommandInteraction) {
        var question : string = interaction.options.getString('question') ?? "";
        var query : string = solveWolframAPI + "&input=" + encodeURIComponent(question); 
        console.log("Solve: "+ query);
        fetch (query).then(async res => {
            var images : string[] = parseXML(await res.text());
            var response :string =" " ;
            images.forEach((src:string)=> response += src + '\n');
            interaction.reply({
                content:`Q: ${question}\n`
            })
            images.forEach((src:string)=> interaction.channel?.send(src));
        });
	},
};