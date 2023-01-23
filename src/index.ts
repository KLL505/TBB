import console from 'console'
import DiscordJS, { Collection, Events, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
dotenv.config()

class Client extends DiscordJS.Client {
    commands = new Collection()
}

var client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const commandsPath = path.join( process.cwd(), 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command : any = client.commands.get(interaction.commandName);
    if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('ready',()=>{
    console.log('Bot started\n')
});

client.on('messageCreate', (message)=>{
    if(message.content == 'Who got the fattest ass' ){
        message.reply({
            content:'Pouya Maboudian'
        })
    }
    else if(message.author.username == 'Pou' ){
        let x:number = Math.floor(Math.random() * 2);
        let replies: string[] = [
            'Dumptruck Alert!',
            'Damn that shit be jiggling!!',
            'Zoo wee mama look at those bundas!',
            'The Jigglewatts are off that chart!',
            'Swiggity swooty, damn what a booty!',
            'Damn you shit with that ass?',
            'Holy Jesus, look at the shitter on that critter!'
        ];
        if(x == 0){
            message.reply({
                content:replies[Math.floor(Math.random() * replies.length)]
            })
        }

    }

});

client.login(process.env.TOKEN);