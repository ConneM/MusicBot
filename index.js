const Discord = require('discord.js');
const yaml = require('js-yaml');
const fs = require("fs")
const path = require("path")
const config = yaml.load(fs.readFileSync("./resources/config.yml", "utf8"));

const client = new Discord.Client({ intents: 32767 });

client.aliases = new Discord.Collection();
client.slash = new Discord.Collection();
module.exports = client;

const dirCommands = fs.readdirSync(path.join(__dirname, "commands"))

for (const subFolder of dirCommands) {
    const filesCommands = fs.readdirSync(path.join(__dirname, "commands", subFolder))
  
    for (const fileCommand of filesCommands) {
      const command = require(path.join(__dirname, "commands", subFolder, fileCommand))
      client.slash.set(command.name, command)
    }
}

["interactionCreate","distube","playSong","addSong","addList","error","empty"].forEach(other => {
  require(`./events/${other}`);
});


client.login(config.CONFIG.BOT.TOKEN)
client.on('ready', () => {
    console.log('Bot is ready!');
    client.application.commands.set(client.slash.map(x => x))
});