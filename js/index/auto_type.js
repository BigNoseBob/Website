// Oliver Rayner
// June 2022

// pseudo-animation

const msgs = [
    "Who needs a development package anyways?",
    "Greetings, Mr. Anderson.",
    "[418] I'm a teapot.",
    "help.",
    "I'm actually an Aerospace Engineer.",
    "Error: Cannot find modu - aha just kidding.",
    "Check out W102.7 in NY, NJ, and PA.",
    "Check out SQUAD - Private Division.",
    "cd projects",
    "Is the #1 or #2 restaraunt place in a city better?",
]

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function random_typing(input_field, string, { delay }) {

    delay = delay || 1000  // ms
    
    for (let i = 0; i < string.length; i++) {
        input_field.value += string[i]
        await sleep(Math.floor(delay * Math.random()))
    }

}

export async function main() {

    await sleep(1500)
    let cli_input = document.getElementById('cli_input')
    let message = msgs[Math.floor(Math.random() * msgs.length)]
    random_typing(cli_input, message, { delay: 5000 / message.length })

}