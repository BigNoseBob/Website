// Oliver Rayner
// July 2022


const http = require('node:http')
const fs = require('node:fs')
const axios = require('axios')

require('dotenv').config()

const api_version = 10
const headers = { "Authorization": `Bot ${process.env.DISCORD_TOKEN}` }
const endpoint = `https://discord.com/api/v${api_version}`


async function get_guilds() {

    const url = endpoint + `/users/@me/guilds`
    const res = await axios({ method: 'GET', responseType: 'json', headers: headers, url: url })
        .catch(err => console.error(err))
    return res.data

}

async function main() {
	
    // HTTPS Server
    const port = 4078
    const URLS = process.argv.includes('-u')

    let server = http.createServer(async (req, res) => {

        let url = req.url
        if (URLS) console.log(url, extension)

        res.writeHead(200, {
            "Content-Type": "text/json"
        })

        let data = { example: "response" }
        if (url === '/gort/guilds') {
            data = await get_guilds()
        }
        res.end(JSON.stringify(data))
  
    })

    server.listen(port)
    console.log(`Listening on https://api.oliverr.dev`)

}

if (require.main === module) {
    main()
}