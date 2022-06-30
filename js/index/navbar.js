// Oliver Rayner
// June 2022

// Make it seem like someone is deleting parts of the webpage

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function random(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function random_typing(element, string, { delay, min }) {

    delay = delay || 1000  // ms
    min = min || 100       // ms
    
    for (let i = 0; i < string.length; i++) {   // Fencepost problem???
        element.textContent += string[i]
        await sleep(random(min, delay))
    }

}

async function delete_type(element, { delay, min }) {

    delay = delay || 1000   // ms
    min = min || 100        // ms

    while (element.textContent.length != 0) {
        element.innerText = element.textContent.substring(0, element.textContent.length - 1)
        await sleep(random(min, delay))
    }

}

async function replace_element(element, message, { href }) {

    message = element.util.toggled? element.util.original_text : message
    href = element.util.toggled? element.util.original_href : href
    element.util.toggled = !element.util.toggled

    await delete_type(element, { delay: 50, min: 50 })
    element.href = href
    element.textContent = null
    console.log(message)
    await random_typing(element, message, { delay: 50, min: 50 })
    
}

export async function main() {

    let navbar = document.getElementById('navbar')
    let selector = document.getElementById('selector')

    const elements = {}, NUM_ELEMENTS = 5
    for (let i = 0; i < NUM_ELEMENTS; i++) {
        let element = document.getElementById(`nav${i}`)
        element.util = { 
            toggled: false, 
            original_text: element.innerText, 
            original_href: element.href 
        }
        elements[`nav${i}`] = element

        let breaks = '&nbsp;<<'
        for (let ix = 0; ix < i + 1; ix++) {
            breaks = '<br>' + breaks
        }
        element.onmouseover = () => {
            selector.innerHTML = breaks
        }
        element.onmouseleave = () => {
            selector.innerHTML = null
        }
    }

    elements['nav0'].onclick = () => {
        replace_element(elements['nav1'], 'MIT SPL', { href: '/STEP1.html' })
        replace_element(elements['nav2'], 'GitHub', { href: 'https://github.com/BigNoseBob' })
        replace_element(elements['nav3'], 'GORT', { href: '/projects.html' })
    }


}