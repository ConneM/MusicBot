const client = require("../index.js");
const Discord = require('discord.js');
const yaml = require('js-yaml');
const fs = require('fs');
const embeds = yaml.load(fs.readFileSync('./resources/embeds.yml', 'utf8'));

client.distube.on("addList", async (queue, playlist) => {
    const embed = new Discord.EmbedBuilder()
    .setColor(embeds.CATEGORY.MUSIC.ADD_LIST.embed_1.color)
    .setURL(playlist.url)
    .setDescription(embeds.CATEGORY.MUSIC.ADD_LIST.embed_1.description.replace("{playlist.name}", playlist.name).replace("{playlist.url}", playlist.url))
  
    queue.textChannel.send({embeds: [embed]})
})