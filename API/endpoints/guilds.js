// Oliver Rayner
// July 2022

// Users endpoint. Returns all cached users

const { user_guilds } = require('../discord.js')

module.exports = {

    data: {
        name: "guilds",
        description: "Returns all cached guilds"
    },
    async execute({ client }) {
        const guilds = await user_guilds()
        return { cache: guilds, size: guilds.length }
    }

}