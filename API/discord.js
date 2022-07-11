// Oliver Rayner
// July 2022

// Discord API wrapper

const axios = require('axios')
require('dotenv').config()

const base_url = "https://discord.com/api"
const bot_token = process.env.DISCORD_TOKEN
const headers = {
    "Authorization": "Bot " + bot_token
}

async function user_guilds() {

    const url = base_url + '/users/@me/guilds'
    const res = await axios({ method: 'GET', headers: headers, url: url, responseType: 'json' })
        .catch(err => console.error(err))
    return res.data

}

async function user_voice() {

    const url = base_url + '/users/@me'
    const res = await axios({ method: 'GET', headers: headers, url: url, responseType: 'json' })
        .catch(err => console.error(err))
    return res.data

}

module.exports = {
    user_guilds,
}

async function main() {

    let data = await user_voice()
    console.log(data)

}

if (require.main === module)
    main()