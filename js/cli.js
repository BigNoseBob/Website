// Oliver Rayner
// June 2022

// Interactive CLI for my website

const COMMANDS = [

    {
        name: 'ping',
        description: 'replies pong',
        execute: function({ document, args }) {

            alert('pong!')

        }
    }

]

function parser(string) {

    let args = string.split(' ')
    console.log(args)

    let name = args[0]
    return [name, args.slice(1)]

}

function main() {

    document.commands = new Map()
    for (let cmd of COMMANDS) {
        document.commands.set(cmd.name, cmd)
    }

    let cli_prefix = document.getElementById('cli_prefix')
    let cli_input = document.getElementById('cli_input')
    let cli = document.getElementById('cli')
  
    cli_input.addEventListener('keypress', event => {
      if (event.key === 'Enter') {
  
        let text = cli_input.value || null
        cli_input.value = null
        let [name, args] = parser(text)
        console.log(name, args)
        
        if (!(name in document.commands)) return

        let cmd = document.commands.get(name)
        cmd.execute({ document, args })

      }
    })
    cli_input.addEventListener('click', event => {
      cli_prefix.style.animation = "blinker 2s linear forwards"
    })

}

window.onload = () => {
    main()   
}