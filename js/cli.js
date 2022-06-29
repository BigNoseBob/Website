// Oliver Rayner
// June 2022

// Interactive CLI for my website

const COMMANDS = [

  {
      name: 'ping',
      description: 'replies pong',
      execute: function({ document, args }) {
          console.log('pong!')
          alert('pong!')
      }
  },

  {
      name: 'spotify_top',
      description: 'shows you your spot'
  }

]

function parser(string) {

  let args = string.split(' ')
  let name = args[0]
  return [name, args.slice(1)]

}

export function main() {

    document.commands = new Map()
    for (let cmd of COMMANDS) {
        document.commands.set(cmd.name, cmd)
    }

    let cli_input = document.getElementById('cli_input')
  
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
    cli_input.addEventListener('click', event => {
      cli_input.style.animation = "1s blink_cursor step-end forward"
    })

}