// Oliver Rayner
// November 2022

// Hohmann Transfer Widget

import { Canvas } from "./Canvas.js"

const container = document.getElementById('canvas')
const canvas = new Canvas({
    window, 
    container, 
    fov: 50,
    // mu: 1.26686534e17,
    container_offsetX: window.innerWidth * 0.35 * 1.6
})

canvas.controls.autoRotate = true
canvas.controls.autoRotateSpeed = 0.5
canvas.resize_factor = 0.8;
canvas.animate()

// let o1 = canvas.ellipse({ a: 16e6 })
// let o2 = canvas.ellipse({ a: 10e6, theta: 90, phi: 23.44 })
// update_hohmann_results()

container.addEventListener("click", () => {
    canvas.controls.autoRotate = false
    console.log(...canvas.intersects)
})


const textbox               = document.getElementById("textbox")
textbox.style.top           = `${window.innerHeight/2 - textbox.offsetHeight/2}px`
textbox.style.fontFamily    = "'space-mono'"

const log                   = document.getElementById("log")
const cmd_input             = document.getElementById("command_input")
function get_input(element) {
    const value = element.value
    element.value = ''
    const tokens = value.split(' ')
    console.log(tokens)
    if (tokens[0] == 'mu' && tokens[1] == '=') {
        canvas.set_center_body({ mu: parseFloat(tokens[2]) })
    } else if (tokens[0].split('(')[0] == "orbit") {
        const param_raw = value.slice(value.indexOf('(') + 1, value.length - 1)
        const params = param_raw.split(',')
        
        const a             = parseFloat(params[0]) || 0
        const e             = parseFloat(params[1]) || 0
        const theta         = parseFloat(params[2]) || 0
        const phi           = parseFloat(params[3]) || 0

        canvas.ellipse({ a, e, theta, phi })
        log.innerText = `Stored as orbit #${canvas.orbits.length - 1}`
    } else if (tokens[0].split('(')[0] == "hohmann") {
        const param_raw = value.slice(value.indexOf('(') + 1, value.length - 1)
        const params = param_raw.split(',')

        const o1            = canvas.orbits[parseInt(params[0])]
        const o2            = canvas.orbits[parseInt(params[1])]
        canvas.hohmann(o1, o2)
        

    }
} 
cmd_input.addEventListener("keyup", event => {
    if (event.key == 'Enter') get_input(cmd_input)
})
