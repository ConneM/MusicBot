const client = require("../index.js");
const Discord = require('discord.js');
const yaml = require('js-yaml');
const fs = require('fs');
const embeds = yaml.load(fs.readFileSync('./resources/embeds.yml', 'utf8'));

client.distube.on("empty", (channel) => {
    const embed = new Discord.EmbedBuilder()
    .setColor(embeds.CATEGORY.MUSIC.EMPTY.embed_1.color)
    .setDescription(embeds.CATEGORY.MUSIC.EMPTY.embed_1.description)

    channel.send({embeds: [embed]})
})