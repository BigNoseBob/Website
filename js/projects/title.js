// Oliver Rayner
// June 2022

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function random_typing(element, string, { delay }) {

    delay = delay || 1000  // ms
    
    for (let i = 0; i < string.length; i++) {   // Fencepost problem???
        element.innerHTML += string[i]
        await sleep(Math.floor(delay * Math.random()))
    }

}

export async function main() {

    let title = document.getElementById('gort_title')
    let description = document.getElementById('description')

    title.innerHTML = null
    await sleep(1000)
    let message = 'This is GORT'
    await random_typing(title, message, { delay: 4000 / message.length })

    description.style.animation = 'fadeIn 1s forwards'

}