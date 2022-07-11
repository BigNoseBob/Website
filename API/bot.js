// Oliver Rayner
// June 2022

// Remake of Gort
// Gort v0.2.0

const DiscordJS = require('discord.js')
const fs = require('fs')


async function login({ FLAGS }) {
    
    require('dotenv').config()
    if (FLAGS) console.log(DiscordJS.Intents.FLAGS)

    // Create the client
    const client = new DiscordJS.Client({ intents: [1, 2, 128, 512, 4096] })    // Use -f to see all the flags
    await client.login(process.env.DISCORD_TOKEN)
    console.log(`Successfully logged in as \x1b[33m${client.user.tag}\x1b[0m with ID: \x1b[33m${client.user.id}\x1b[0m`)
    
    return client

}

async function main() {

    // Login and grab client and run the http server
    const client = await login({ FLAGS : process.argv.includes('-f') })

}

module.exports = {
    login
}

if (require.main == module) {
    main()
}