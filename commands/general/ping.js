module.exports = {
    name: "ping",
    description: "a ping command",

    run: async(client, interaction, args) => {
        interaction.reply("Pong!")
    }
}