function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function random(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function delete_type_input(element, { delay, min, chars_to_delete }) {

    delay = delay || 1000   // ms
    min = min || 100        // ms
    chars_to_delete = chars_to_delete || 1000000000

    while (element.value.length != 0 && chars_to_delete > 0) {
        element.value = element.value.substring(0, element.value.length - 1)
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

async function random_typing_input(input_field, string, { delay }) {

    delay = delay || 1000  // ms
    
    for (let i = 0; i < string.length; i++) {
        input_field.value += string[i]
        await sleep(Math.floor(delay * Math.random()))
    }

}

const messages = [
    "an Aerospace Engineer.",
    "a Computer Scientist.",
    "an Electrical Engineer.",
    "a rockclimber.",
    "a cartoon character.",
    "Johnny Bravo.",
    "a student.",
    "a researcher.",
    "a runner.",
    "a rower.",
    "a public speaker.",
    "Oliverr.",
    "a golden retreiver.",
    "a storyteller.",
    "a brother.",
    "a teacher.",
    "an athlete.",
    "a magician."
]

export async function main() {

    let input = document.getElementById('cli_input')
    await sleep(4000)
    
    while (true) {

        let message = messages[Math.floor(Math.random() * messages.length)]
        await random_typing_input(input, message, { delay: 5000 / message.length })
        await sleep(4000)
        await delete_type_input(input, { delay: 50, min: 50 })
        await sleep(1000)

    }

}