// Oliver Rayner
// June 2022

// Interactive CLI for my website

// This is a bit of a hardcode right now. I don't really wanna spend anymore
// time looking at how to import es6 modules...
const COMMANDS = [
    'ping.js',
    'cd.js',
]

function parser(string) {

    let args = string.split(' ')
    let name = args[0]
    return [name, args.slice(1)]

}

export async function main() {

    document.commands = new Map()
    for (let file of COMMANDS) {
        const data = await import(`./commands/${file}`)
        document.commands.set(data.cmd.data.name, data.cmd)
    }

    let cli_input = document.getElementById('cli_input')
    cli_input.value = null
  
    cli_input.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
  
        let text = cli_input.value || null
        cli_input.value = null
        let [name, args] = parser(text)

        if (!(document.commands.has(name))) return

        let cmd = document.commands.get(name)
        cmd.execute({ document, args })

      }
    })

}