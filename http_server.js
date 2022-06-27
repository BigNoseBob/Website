// Oliver Rayner
// June 2022

const http = require('node:http')
const fs = require('node:fs')

async function main() {
	
    // HTTP Server
    const port = 50

    let server = http.createServer(async (req, res) => {

        res.writeHead(200, {
            "Content-type": "text/html"
        });
        
        let html = fs.readFileSync(__dirname + "/resume.html", "utf8");
        const user = "Node JS";
        
        html = html.replace("{ user }", user);
        res.end(html);

    })

    server.listen(port)
    // console.log(`Listening on http://ec2-3-22-234-91.us-east-2.compute.amazonaws.com:${port}`)
    console.log(`Listening on http://oliverr.dev:${port}`)

}

if (require.main === module) {
    main()
}
