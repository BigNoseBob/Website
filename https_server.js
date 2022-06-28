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
        if (req.url.endsWith('.html')) {

            res.writeHead(200, {
                "Content-type": "text/html"
            })
            fs.readFile(__dirname + req.url, (err, data) => {
                res.end(data)
            })

        } else if (req.url.endsWith('.jpeg')) {

            res.writeHead(200, {
                "Content-type": "image/jpeg"
            })
            fs.readFile(__dirname + req.url, (err, data) => {
                res.end(data)
            })

        } else {
            res.writeHead(200, {
                "Content-type": "text/html"
            })
            fs.readFile(__dirname + '/index.html', (err, data) => {
                res.end(data)
            })
        }
        

    })

    server.listen(port)
    
    console.log(__dirname)
    console.log(`Listening on https://oliverr.dev:${port}`)

}

if (require.main === module) {
    main()
}
