// Oliver Rayner
// November 2022

// JS CLI

class CLI {

    constructor () {
        
    }

    tokenize(raw_input) {

        const split = raw_input.split(' ')
        for (let i = 0; i < split.length; i++) {
            split[i] = split[i].split('(')
            split[i] = split[i].split(')')
        }
        const tokens = []
        console.log(split)

        let i = 0
        while (i < split.length) {
            const token = split[i]
        }

        return tokens

    }

}


const cli = new CLI()
const tokens = cli.tokenize('orbit(10, 0.5)')
console.log()
console.log(tokens)