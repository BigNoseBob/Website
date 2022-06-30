// Oliver Rayner
// June 2022

// Navigate to a directory

const dirs = {
    'projects': 'https://github.com/BigNoseBob',
    'projects/SPL': 'http://spacepropulsion.mit.edu',
    'projects/GitHub': 'https://github.com/BigNoseBob',
    'projects/GORT': '/projects.html'
}

export let cmd = {
    data: {
        name: 'cd',
        description: 'navigate to a directory'
    },
    execute: async function({ document, args }) {

        let location = dirs[args[0]]
        console.log(location)
        if (!location) return
        window.location.href = location

    }
}