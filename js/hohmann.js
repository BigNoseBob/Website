// Oliver Rayner
// November 2022

// Hohmann Transfer Widget

import { Canvas } from "./Canvas.js"

const container = document.getElementById('canvas')
const canvas = new Canvas(window, container)
canvas.animate()

const clear_button = document.getElementById('clear')
clear_button.onclick = () => canvas.clear()

const mu_input          = document.getElementById('mu')
const a_input           = document.getElementById('a')
const e_input           = document.getElementById('e')
const theta_input       = document.getElementById('theta')
const phi_input         = document.getElementById('phi')
const generate_button   = document.getElementById('generate')
const hohmann_button    = document.getElementById('hohmann')

const vc1               = document.getElementById('vc1')
const vc2               = document.getElementById('vc2')
const vpi               = document.getElementById('vpi')
const valpha            = document.getElementById('valpha')
const deltav            = document.getElementById('deltav')
const a                 = document.getElementById('semi-major')
const e                 = document.getElementById('eccentricity')

generate_button.onclick = () => {
    canvas.mu = parseFloat(mu_input.value)
    canvas.ellipse({
        a:      parseFloat(a_input.value),
        e:      parseFloat(e_input.value),
        theta:  parseFloat(theta_input.value),
        phi:    parseFloat(phi_input.value),
    })
}

function update_hohmann_results() {

    const o1 = canvas.orbits[canvas.orbits.length - 2]
    const o2 = canvas.orbits[canvas.orbits.length - 1]

    let transfer = canvas.hohmann(o1, o2)
    console.log(transfer)

    vc1.innerText       = transfer.v1
    vc2.innerText       = transfer.v2
    vpi.innerText       = transfer.vpi
    valpha.innerText    = transfer.valpha
    deltav.innerText    = transfer.delta_vtotal
    a.innerText         = transfer.a
    e.innerText         = Math.abs(transfer.e)

}
hohmann_button.onclick = update_hohmann_results

let o1 = canvas.ellipse({ a: 8e6 })
let o2 = canvas.ellipse({ a: 4e6, theta: 90, phi: 45 })
update_hohmann_results()

