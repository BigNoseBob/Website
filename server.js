// Oliver Rayner
// June 2022

const http = require('node:http')
const fs = require('node:fs')

async function main() {
	
    // HTTP Server
    const port = 6000
    const html = fs.readFileSync('./portfolio.html')

    let server = http.createServer(async (req, res) => {

        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(html)

    })

    server.listen(port)
    console.log(`Listening on http://ec2-3-22-234-91.us-east-2.compute.amazonaws.com:${port}`)

}

if (require.main === module) {
    main()
}
