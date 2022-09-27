const Discord = require('discord.js');
const fs = require('fs');
const yaml = require('js-yaml');
const embeds = yaml.load(fs.readFileSync('./resources/embeds.yml', 'utf8'));

module.exports = {
    name: "music",
    description: "Music Commands",
    options: [
        {
            name: 'play',
            description: 'Plays a song from the queue.',
            type: 1,
            options: [{ name: "query", description: "The song to play.", type: 3, required: true, }]
        },
        {
            name: 'volume',
            description: 'Changes the volume of the player.',
            type: 1,
            options: [{ name: "volume", description: "The volume to set the player to.", type: 3, required: true }]
        },
        {
            name: 'options',
            description: 'Music options.',
            type: 1,
            options: [{ name: "option", description: "The option to change.", type: 3, choices: [{name: "stop", value: "stop"}, {name: "skip", value: "skip"}, {name: "queue", value: "queue"}, {name: "pause", value: "pause"}, {name: "resume", value: "resume"}], required: true, }],
        }
    ],

    run: async(client, interaction, args) => {
        const [subCommand] = args;

        if(subCommand === "play") {
            try {
            const query = interaction.options.getString("query"); 
            if (!interaction.member.voice?.channel) return interaction.reply(`You must be in a voice channel to use this command.`)
            if (interaction.guild.members.me.voice.channel && interaction.member.voice.channel.id != interaction.guild.members.me.voice?.channel) return interaction.reply(`You must be in the same voice channel as me to use this command.`)

            client.distube.play(interaction.member.voice.channel, query, {
                member: interaction.member,
                textChannel: interaction.channel,
                interaction
            })
            interaction.reply("Processing...")
            } catch (err) {
                console.log(err);
            }
        } else if(subCommand === "volume") {
            const guildQueue = client.distube.getQueue(interaction)
           
            if (!guildQueue) {
                const embed = new Discord.EmbedBuilder()
                    .setColor(embeds.CATEGORY.MUSIC.VOLUME.embed_1.color)
                    .setDescription(embeds.CATEGORY.MUSIC.VOLUME.embed_1.description);
                return interaction.reply({embeds: [embed]});
            } else {
                const volumes = interaction.options.getString("volume");
                let volume = parseInt(volumes);
                if (!volume) {
                    const embed = new Discord.EmbedBuilder()
                        .setColor(embeds.CATEGORY.MUSIC.VOLUME.embed_2.color)
                        .setDescription(embeds.CATEGORY.MUSIC.VOLUME.embed_2.description);
                    return interaction.reply({embeds: [embed]});
                } else {
                    await guildQueue.setVolume(volume);
                    const embed = new Discord.EmbedBuilder()
                        .setColor(embeds.CATEGORY.MUSIC.VOLUME.embed_3.color)
                        .setDescription(embeds.CATEGORY.MUSIC.VOLUME.embed_3.description.replace("{volume}", volume));

                    interaction.reply({embeds: [embed]});
                }
            }
        } else if(subCommand === "options") {
            const option = interaction.options.getString("option");
            if(option === "stop") {
                const guildQueue = client.distube.getQueue(interaction)

                if (!guildQueue) {
                    const embed = new EmbedBuilder()
                        .setColor(embeds.CATEGORY.MUSIC.STOP.embed_1.color)
                        .setDescription(embeds.CATEGORY.MUSIC.STOP.embed_1.description);
                    return interaction.reply({embeds: [embed]});
                } else {
                await guildQueue.stop();
                const embed = new Discord.EmbedBuilder()
                    .setColor(embeds.CATEGORY.MUSIC.STOP.embed_2.color)
                    .setDescription(embeds.CATEGORY.MUSIC.STOP.embed_2.description)
    
                    interaction.reply({embeds: [embed]});
                }
            }
            if(option === "skip") {
                const guildQueue = client.distube.getQueue(interaction)
            
                if (!guildQueue) {
                    const embed = new EmbedBuilder()
                        .setColor(embeds.CATEGORY.MUSIC.SKIP.embed_1.color)
                        .setDescription(embeds.CATEGORY.MUSIC.SKIP.embed_1.description);
                    return interaction.reply({embeds: [embed]});
                } else {
                await guildQueue.skip();
                const embed = new Discord.EmbedBuilder()
                    .setColor(embeds.CATEGORY.MUSIC.SKIP.embed_2.color)
                    .setDescription(embeds.CATEGORY.MUSIC.SKIP.embed_2.description)
    
                interaction.reply({embeds: [embed]});
                }
            }
            if(option === "queue") {
                const queue = client.distube.getQueue(interaction)
                if (!queue) return interaction.reply(` There is nothing playing!`)
                const q = queue.songs.map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join('\n')
                interaction.reply(`**Server Queue**\n${q}`)
            }
            if(option === "pause") {
                const guildQueue = client.distube.getQueue(interaction)
                if (!guildQueue) {
                    const embed = new Discord.EmbedBuilder()
                        .setColor(embeds.CATEGORY.MUSIC.PAUSE.embed_1.color)
                        .setDescription(embeds.CATEGORY.MUSIC.PAUSE.embed_1.description);
                    return interaction.reply({embeds: [embed]});
                } else {
                    guildQueue.pause()
                    const embed = new Discord.EmbedBuilder()
                        .setColor(embeds.CATEGORY.MUSIC.PAUSE.embed_2.color)
                        .setDescription(embeds.CATEGORY.MUSIC.PAUSE.embed_2.description);
    
                    interaction.reply({embeds: [embed]});
                }
            }
            if(option === "resume") {
                const guildQueue = client.distube.getQueue(interaction)

                if (!guildQueue) {
                    const embed = new Discord.EmbedBuilder()
                        .setColor(embeds.CATEGORY.MUSIC.RESUME.embed_1.color)
                        .setDescription(embeds.CATEGORY.MUSIC.RESUME.embed_1.description);
                    return interaction.reply({embeds: [embed]});
                } else {
                    guildQueue.resume()
                    const embed = new Discord.EmbedBuilder()
                        .setColor(embeds.CATEGORY.MUSIC.RESUME.embed_2.color)
                        .setDescription(embeds.CATEGORY.MUSIC.RESUME.embed_2.description);
                    interaction.reply({embeds: [embed]});
                }
            }
        }
    }
}