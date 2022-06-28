// Oliver Rayner
// June 2022

const https = require('node:https')
const fs = require('node:fs')

async function main() {
	
    // HTTP Server
    const port = 443
    const options = {
        key: fs.readFileSync('./privkey.pem'),
        cert: fs.readFileSync('./fullchain.pem'),
    }

    let server = https.createServer(options, async (req, res) => {

        console.log(req.url)

        let url = req.url
        if (url === '/') 
            url = '/index.html'
        res.writeHead(200, {
            "Content-Type": url.endsWith('.jpeg')? "image/jpeg" : "text/html"
        })
        fs.readFile(__dirname + url, (err, data) => {
            res.data(data)
        })
  
    })

    server.listen(port)
    console.log(`Listening on https://oliverr.dev:${port}`)

}

if (require.main === module) {
    main()
}
