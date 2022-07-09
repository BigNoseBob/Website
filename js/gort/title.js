// Oliver Rayner
// June 2022

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

export async function main() {

    let title = document.getElementById('gort_title')
    let description = document.getElementById('description')
    let left = document.getElementById('left')
    let buymeacoffee = document.getElementById('buymeacoffee')

    let guild_count = document.getElementById('guild_count')
    let user_count = document.getElementById('user_count')

    fetch('http://localhost:4078/gort/guilds').then(response => response.json()).then(data => {
        guild_count.textContent = `SERVER COUNT: ${data.size}`
    })
    fetch('http://localhost:4078/gort/users').then(response => response.json()).then(data => {
        user_count.textContent = `USER COUNT: ${data.size}`
    })

    title.innerHTML = null
    await sleep(1000)
    let message = 'This is GORT'
    await random_typing(title, message, { delay: 100 })

    description.style.animation = 'fadeIn 1s forwards'
    left.style.animation = 'fadeIn 1s forwards'
    buymeacoffee.style.animation = 'fadeIn 1s forwards'


}