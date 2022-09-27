const client = require("../index.js");
const Discord = require('discord.js');
const yaml = require('js-yaml');
const fs = require('fs');
const embeds = yaml.load(fs.readFileSync('./resources/embeds.yml', 'utf8'));

client.distube.on("error", (channel, e) => {
    const embed = new Discord.EmbedBuilder()
    .setColor(embeds.CATEGORY.MUSIC.ERROR.embed_1.color)
    .setDescription(embeds.CATEGORY.MUSIC.ERROR.embed_1.description)

    channel.send({embeds: [embed]})
    console.log(e)
})