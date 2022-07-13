// Oliver Rayner
// July 2022

// Trying to abstract how I'm handling the API requests

const fs = require('fs')
const config = JSON.parse(fs.readFileSync(__dirname + '/config.json'))
const API_ENDPOINTS = config.api_endpoints
const gort_api_keys = JSON.parse(fs.readFileSync(__dirname + '/api_keys.keys')).keys
const endpoints = load_endpoints()

const EXTENSIONS = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.ico': 'image/jpeg',
    '.png': 'image/png',
    '.jpeg': 'image/jpeg',
    '.css': 'text/css',
}

function load_endpoints(dir=__dirname + '/endpoints') {

    const endpoints = new Map()
    const endpoint_files = fs.readdirSync(`${dir}`).filter(file => file.endsWith('.js') && !file.startsWith('_'))
    for (let file of endpoint_files) {
        let endpoint = require(`${dir}/${file}`)
        endpoints.set(endpoint.data.name, endpoint)
    }
    return endpoints

}

function response_template({ status, code, data, message }) {

    status = status || "success"
    data = data || null
    message = message || null
    code = code || 200

    return { status: status, code: code, message: message, data: data }

}

async function initialize() {

    const client = await require(__dirname + '/bot.js').login()

    async function API_call(req, res) {

        let url = req.url, data, headers = req.headers;

        const endpoint = endpoints.get(API_ENDPOINTS[req.url.split('?')[0]])
    
        if(!endpoint) {

            // If the call is just to the side itself
            if (url === '/')
                url = '/index.html'
    
            let extension = EXTENSIONS[url.substring(url.indexOf('.'))]
    
            if (!extension) {
                res.writeHead(404, {
                    "Content-Type": 'text/json'
                })
                data = response_template({ status: "failure", code: 404, message: "Invalid API endpoint" })    
                res.end(JSON.stringify(data))
                return
            }
    
            res.writeHead(200, {
                "Content-Type": extension
            })
            fs.readFile(__dirname + url, (err, data) => {
                res.end(data)
            })
            return
    
        } else {
            // It's an API call

            console.log(endpoint)
            if (!(gort_api_keys.includes(headers["authorization"])) && (url != '/' && endpoint.data?.name != 'spotify_link' )) {
                res.writeHead(400, {
                    "Content-Type": "text/json"
                })
                data = response_template({ status: "failure", code: 400, message: "Unauthorized" })
                res.end(JSON.stringify(data))
                return
            }
    
            res.writeHead(200, {
                "Content-Type": 'text/json'
            })
            let response_obj = await endpoint.execute({ client, url })
            data = response_template({ status: "success", code: 200, data: response_obj })
    
        }
        res.end(JSON.stringify(data))
    
    }

    return API_call

}

module.exports = {
    initialize,
}