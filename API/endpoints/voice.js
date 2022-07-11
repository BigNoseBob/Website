// Oliver Rayner
// July 2022

// Voice endpoint. Returns current number of voiceConnections
const axios = require('axios')

module.exports = {

    data: {
        name: "voice",
        description: "Returns current number of active voiceConnections"
    },
    async execute({ client }) {
        const res = await axios({ method: 'GET', url:'http://localhost:4078/gort/voice', responseType: 'json' })
        return res.data.data
    }

}