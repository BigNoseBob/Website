// Oliver Rayner
// June 2022

const https = require('node:https')
const fs = require('node:fs')
const axios = require('axios')

const ipstack_api_key = 'c9dfba0314861072e8989dc2e5c77a3a'

async function ip_lookup(ipv4) {

    const url = `https://api.ipstack.com/${ipv4}?access_key=${ipstack_api_key}`
    let res = await axios({ method: 'GET', responseType: 'json', url: url }).catch(err => console.error(err))
    return res.data

}

const parseIp = (req) => req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress

async function main() {
	
    // HTTP Server
    const port = 443
    const options = {
        key: fs.readFileSync('./privkey.pem'),
        cert: fs.readFileSync('./fullchain.pem'),
    }

    let server = https.createServer(options, async (req, res) => {

        let url = req.url
        if (url === '/') {
            url = '/index.html'

            let ip = parseIp(req)
            let ip_data = await ip_lookup(ip.substring(7))    // Returns it in ipv4 format

            console.log(ip_data)
        }
        res.writeHead(200, {
            "Content-Type": (url.endsWith('.jpeg') || url.endsWith('.ico'))? "image/jpeg" : "text/html"
        })
        fs.readFile(__dirname + url, (err, data) => {
            res.end(data)
        })
  
    })

    server.listen(port)
    console.log(`Listening on https://oliverr.dev:${port}`)

}

if (require.main === module) {
    main()
}
