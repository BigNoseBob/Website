// Oliver Rayner
// June 2022

const https = require('node:https')
const fs = require('node:fs')
const axios = require('axios')

const ipgeolocation_api_key = '8b1cd26a9bab447788846b4b07aa3852'

async function ip_lookup(ipv4) {

    const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${ipgeolocation_api_key}&ip=${ipv4}`
    let res = await axios({ method: 'GET', responseType: 'json', url: url }).catch(err => console.error(err))
    return res.data

}

const parseIp = (req) => req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress

const EXTENSIONS = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.ico': 'image/jpeg',
    '.png': 'image/png',
    '.jpeg': 'image/jpeg',
    '.css': 'text/css',
}


async function main() {
	
    // HTTP Server
    const port = 443
    const options = {
        key: fs.readFileSync('./ssl/privkey.pem'),
        cert: fs.readFileSync('./ssl/fullchain.pem'),
    }

    const URLS = process.argv.includes('-u')
    const IPS = process.argv.includes('-i')

    let server = https.createServer(options, async (req, res) => {

        let url = req.url
        let extension = EXTENSIONS[url.substring(url.indexOf('.'))] || 'text/html'
        if (URLS) console.log(url, extension)

        if (url === '/') {
            url = '/index.html'

            if (IPS) {
                let ip = parseIp(req)
                ip_lookup(ip.substring(7)).then(data => {   // Returns it in ipv4 format
                    console.log({ 
                        ip: data.ip, 
                        city: data.city, 
                        state_prov: data.state_prov, 
                        country_name: data.country_name,
                        coordinates: [data.latitude, data.longitude],
                        user_agent: req.headers['user-agent'],
                    })
                }).catch(err => console.error(err))
            }

        }
        res.writeHead(200, {
            "Content-Type": extension
        })
        fs.readFile(__dirname + url, (err, data) => {
            res.end(data)
        })
  
    })

    server.listen(port)
    console.log(`Listening on https://localhost:${port}`)

}

if (require.main === module) {
    main()
}
