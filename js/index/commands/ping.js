// Oliver Rayner
// June 2022

// replies pong

export let cmd = {
    data : {
        name: 'ping',
        description: 'replies pong',
    },
    execute: async function({ document, args }) {
        alert('pong!')
    }
}