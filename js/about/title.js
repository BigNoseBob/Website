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
    let input = document.getElementById('cli_input')

    await sleep(1000)
    await random_typing(title, 'ABOUT', { delay: 100 })
    
    // title.innerHTML = null
    // await sleep(1000)
    // await random_typing(title, 'I am', { delay: 100 })
    // await sleep(100)
    // await random_typing(title, '... ', { delay: 150 })
    // await sleep(500)
    // await random_typing(title, 'a student.', { delay: 100 })
    // await sleep(500)
    // await delete_type(title, { delay: 50, min: 50, chars_to_delete: 'a student.'.length })
    // await sleep(500)
    // await random_typing(title, 'a researcher.', { delay: 100 })
    // await sleep(500)
    // await delete_type(title, { delay: 50, min: 50, chars_to_delete: 'a researcher.'.length })
    // await sleep(500)
    // await random_typing(title, 'a climber.', { delay: 100 })
    // await sleep(500)
    // await delete_type(title, { delay: 50, min: 50, chars_to_delete: 'a climber.'.length })
    // await sleep(1000)
    // await delete_type(title, { delay: 150, min: 150, chars_to_delete: '... '.length })
    // await sleep(750)
    // await random_typing(title, ' Oliver.', { delay: 120, min: 120 })

    description.style.animation = 'fadeIn 1s forwards'
    left.style.animation = 'fadeIn 1s forwards'
    contact.style.animation = 'fadeIn 1s forwards'
    input.style.animation = 'fadeIn 1s forwards'


}