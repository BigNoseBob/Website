// Oliver Rayner
// June 2022

// Replies pong

export const data = {
    name: 'ping',
    description: 'replies pong',
    execute: function ({ document, args }) {

        // Grab args
        console.log('pinging...')
        alert('pong')

    }
}
