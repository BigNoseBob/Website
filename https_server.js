// Oliver Rayner
// July 2022

const https = require('node:https')
const fs = require('node:fs')
const mime = require('mime')

const config = JSON.parse(fs.readFileSync(__dirname + '/config.json'))

async function main() {
	
    // HTTPS Server
    const port = 443
    const options = {
        key: fs.readFileSync(__dirname + '/ssl/privkey.pem'),
        cert: fs.readFileSync(__dirname + '/ssl/fullchain.pem'),
    }

    const server = https.createServer(options, async (req, res) => {

        // I wonder if this is still vulnerable to a url containing: /../Gort/ or something like that.
        const url = config.endpoints[req.url] || req.url
        if (config.blacklist.includes(url)) {
            res.end("[402] FORBIDDEN")
            return
        }
        const extension = mime.getType(url)

        res.writeHead(200, { "Content-Type": extension })
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
