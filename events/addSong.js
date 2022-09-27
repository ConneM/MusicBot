const client = require("../index.js");
const Discord = require('discord.js');
const yaml = require('js-yaml');
const fs = require('fs');
const embeds = yaml.load(fs.readFileSync('./resources/embeds.yml', 'utf8'));

client.distube.on("addSong", async (queue, song) => {
    const embed = new Discord.EmbedBuilder()
    .setColor(embeds.CATEGORY.MUSIC.ADD_SONG.embed_1.color)
    .setURL(song.url)
    .setDescription(embeds.CATEGORY.MUSIC.ADD_SONG.embed_1.description.replace("{song.name}", song.name).replace("{song.url}", song.url))
  
    queue.textChannel.send({embeds: [embed]})
})