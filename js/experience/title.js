// Oliver Rayner
// June 2022

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function random(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function delete_type(element, { delay, min, chars_to_delete }) {

    delay = delay || 1000   // ms
    min = min || 100        // ms
    chars_to_delete = chars_to_delete || 1000000000

    while (element.textContent.length != 0 && chars_to_delete > 0) {
        element.innerText = element.textContent.substring(0, element.textContent.length - 1)
        chars_to_delete -= 1
        await sleep(random(min, delay))
    }

}

async function random_typing(element, string, { delay, min }) {

    delay = delay || 1000  // ms
    min = min || 100
    
    for (let i = 0; i < string.length; i++) {   // Fencepost problem???
        element.innerHTML += string[i]
        await sleep(random(delay, min))
    }

}

async function type_string(element, string) {

    string

}

export async function main() {

    let title = document.getElementById('name')
    let description = document.getElementById('description')
    let left = document.getElementById('left')
    let contact = document.getElementById('contact')

    await sleep(1000)
    await random_typing(title, 'EXPERIENCE', { delay: 100 })

    description.style.animation = 'fadeIn 1s forwards'
    left.style.animation = 'fadeIn 1s forwards'
    contact.style.animation = 'fadeIn 1s forwards'

}