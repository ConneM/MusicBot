const client = require("../index.js");
const Discord = require('discord.js');
const yaml = require('js-yaml');
const fs = require('fs');
const embeds = yaml.load(fs.readFileSync('./resources/embeds.yml', 'utf8'));

client.distube.on("playSong", async (queue, song) => {
    
    const row = new Discord.ActionRowBuilder()
      .addComponents(
          new Discord.ButtonBuilder()
          .setStyle("Secondary")
          .setCustomId("toggle")
          .setEmoji("⏮️"),
    
          new Discord.ButtonBuilder()
          .setStyle("Danger")
          .setCustomId("pause")
          .setEmoji("⏸️"),
    
          new Discord.ButtonBuilder()
          .setStyle("Secondary")
          .setCustomId("skip")
          .setEmoji("⏭️")
      )
    
    const row2 = new Discord.ActionRowBuilder()
      .addComponents(
          new Discord.ButtonBuilder()
          .setStyle("Secondary")
          .setCustomId("toggle")
          .setEmoji("⏮️"),
    
          new Discord.ButtonBuilder()
          .setStyle("Danger")
          .setCustomId("unpause")
          .setEmoji("▶️"),
    
          new Discord.ButtonBuilder()
          .setStyle("Secondary")
          .setCustomId("skip")
          .setEmoji("⏭️")
      )

    const embed2 = new Discord.EmbedBuilder()
      .setColor('Red')
      .setTitle('Now Playing')
      .setDescription(`${song.name}`)
    
    const msg = await queue.textChannel.send({embeds: [embed2], components: [row]})
    const collector = msg.createMessageComponentCollector({ filter: (i) => i.user.id && i.customId, time: 300000 }) // 5 minutes
    collector.on("collect", async (m) => {
      if (m.customId === "toggle") {
          await m.deferUpdate()
          let guildQueue = client.distube.getQueue(queue)
          guildQueue.previous().catch(() => {
            const embed = new Discord.EmbedBuilder()
              .setColor(embeds.CATEGORY.MUSIC.PREVIOUS.embed_1.color)
              .setDescription(embeds.CATEGORY.MUSIC.PREVIOUS.embed_1.description)
              queue.textChannel.send({embeds: [embed]})
          });
      } else if (m.customId === "pause") {
          await m.deferUpdate()
          const embed2 = new Discord.EmbedBuilder()
              .setColor(embeds.CATEGORY.MUSIC.NOW_PLAYING.embed_1.color)
              .setTitle(embeds.CATEGORY.MUSIC.NOW_PLAYING.embed_1.title)
              .setDescription(embeds.CATEGORY.MUSIC.NOW_PLAYING.embed_1.description.replace("{song.name}", song.name))
          const guildQueue = client.distube.getQueue(queue)
          try {
            guildQueue.pause()
          } catch (e) {}
          m.editReply({embeds: [embed2], components: [row2]}).catch(_ => {
              if(!guildQueue)
                  queue.stop();
          })
      } else if (m.customId === "unpause") {
          await m.deferUpdate()
          const embed2 = new Discord.EmbedBuilder()
              .setColor(embeds.CATEGORY.MUSIC.NOW_PLAYING.embed_1.color)
              .setTitle(embeds.CATEGORY.MUSIC.NOW_PLAYING.embed_1.title)
              .setDescription(embeds.CATEGORY.MUSIC.NOW_PLAYING.embed_1.description.replace("{song.name}", song.name))
          const guildQueue = client.distube.getQueue(queue)
          try {
            guildQueue.resume()
          } catch (e) {}
          m.editReply({embeds: [embed2], components: [row]});
      } else if (m.customId === "skip") {
          await m.deferUpdate()
          const embed = new Discord.EmbedBuilder()
              .setColor(embeds.CATEGORY.MUSIC.SKIP.embed_3.color)
              .setURL(song.url)
              .setDescription(embeds.CATEGORY.MUSIC.SKIP.embed_3.description.replace("{song.name}", song.name).replace("{song.url}", song.url))
          const guildQueue = client.distube.getQueue(queue)
          try {
          guildQueue.skip().catch(_ => {
            guildQueue.stop();
          });
          } catch (e) {}
          m.editReply({embeds: [embed], components: []});
      }
    })
})