const { Client, Intents, Interaction, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const { token } = require('./config.json')
const ipchecker = require('./ipcheck')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.on("interactionCreate",async interaction => {
    if (!interaction.isCommand()) return

    const { commandName } = interaction

    if (commandName === "ipcheck") {
        await interaction.reply({
            content: 'ipchecker',
            components: [
                new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('ipcheck')
                            .setLabel('確認する')
                            .setStyle('SECONDARY')
                    )
            ]
        })
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isMessageComponent()) return

    const { customId } = interaction
    
    if (customId === 'ipcheck') {
        const gip = await ipchecker.getGIP()
        await interaction.update({
            content: 'ipchecker',
            embeds: [
                new MessageEmbed()
                    .setTitle(`${gip}`)
            ],
            components: [
                new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('ipcheck')
                            .setLabel('確認する')
                            .setStyle('SECONDARY')
                    )
            ]
        })
    }
})

client.login(token)