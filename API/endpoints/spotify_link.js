// Oliver Rayner
// July 2022

// Spotify redirect URI

module.exports = {

    data: {
        name: "spotify_link",
        description: "Writes user token and refresh token to file"
    },
    async execute({ url, headers }) {
        
        const querystring = url.substring(url.indexOf('?'))
        const headers = {
            Authorization: "6Q0otRbN7gchxX5Pdi0aA6fs7LmZd8xXKXDislO6",
        }
        const res = await axios({ method: 'POST', url: 'http://localhost:4078' + querystring, headers: headers })

    }

}