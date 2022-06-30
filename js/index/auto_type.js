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
    "Is the #1 or #2 restaurant place in a city better?",
    "Unified Engineerinig has me uni-fried.",
    "Have you checked out GORT?",
    "I'm acutally a real life cartoon character.",
]

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function random(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function random_typing(element, string, { delay, min }) {

    delay = delay || 1000  // ms
    min = min || 100
    
    for (let i = 0; i < string.length; i++) {   // Fencepost problem???
        element.innerHTML += string[i]
        await sleep(random(delay, min))
    }

}

async function random_typing_input(input_field, string, { delay }) {

    delay = delay || 1000  // ms
    
    for (let i = 0; i < string.length; i++) {
        input_field.value += string[i]
        await sleep(Math.floor(delay * Math.random()))
    }

}

export async function main() {

    let cli_input = document.getElementById('cli_input')
    let title = document.getElementById('title')
    title.innerHTML = null
    let body = document.getElementById('body')

    let title_message_1 = 'Hello,'
    let title_message_2 = 'my name is Oliver.'

    await sleep(500)
    await random_typing(title, title_message_1, { delay: 100 })
    title.innerHTML += '<br>'
    await sleep(500)
    await random_typing(title, title_message_2, { delay: 100 })
    body.style.animation = 'fadeIn 1s forwards'
    
    await sleep(1500)
    let message = msgs[Math.floor(Math.random() * msgs.length)]
    random_typing_input(cli_input, message, { delay: 5000 / message.length })

}