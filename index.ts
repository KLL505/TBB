import console from 'console'
import DiscordJS, { GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready',()=>{
    console.log('Bot started')
});

client.on('messageCreate', (message)=>{
    if(message.content == 'Who got the fattest ass' ){
        message.reply({
            content:'Pouya Maboudian'
        })
    }
});

client.on('messageCreate', (message)=>{
    if(message.content == 'Jiggle' ){
        fs.readdir('./assets', (err, files) => {
            if (err) {
                console.error(err);
                return;
            }   
            const randomFile = files[Math.floor(Math.random() * files.length)];
            message.channel.send({
                files: [`./assets/${randomFile}`]
            });
        });
    }
});

client.on('messageCreate', (message)=>{
    if(message.author.username == 'Pou' ){
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