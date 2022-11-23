// Oliver Rayner
// November 2022

// 3D Orbit Dealio

import * as THREE from "../node_modules/three/build/three.module.js"
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js"

// Initialize renderer and scene
const container = document.getElementById('canvas')
let width = container.offsetWidth;
let height = container.offsetHeight;

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor( new THREE.Color("#171515"), 0);
renderer.setSize( width, height );

container.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 500 );

window.addEventListener("resize", () => {
    width = container.offsetWidth;
    height = container.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  })

// Orbit Controls
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 0, 120 );
camera.lookAt( 0, 0, 0 );
controls.update()

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper());

const xc = width/2
const yc = height/2

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function rotation_matrixX(point, angle) {
    const x = point.x || 0 
    const y = point.y || 0
    const z = point.z || 0

    point.y =  Math.cos(angle) * y + Math.sin(angle) * z
    point.z = -Math.sin(angle) * y + Math.cos(angle) * z
}

function rotation_matrixY(point, angle) {
    const x = point.x || 0 
    const y = point.y || 0
    const z = point.z || 0

    point.x =  Math.cos(angle) * x + Math.sin(angle) * z
    point.z = -Math.sin(angle) * x + Math.cos(angle) * z
}

function rotation_matrixZ(point, angle) {
    const x = point.x || 0 
    const y = point.y || 0
    const z = point.z || 0

    point.x =  Math.cos(angle) * x + Math.sin(angle) * y
    point.y = -Math.sin(angle) * x + Math.cos(angle) * y
}

const rotation_matricies = {
    "X": rotation_matrixX,
    "Y": rotation_matrixY,
    "Z": rotation_matrixZ,
}

function rotate_points(points, angle, plane="Y") {
    for (const point of points) {
        rotation_matricies[plane](point, angle)
    }
}

function get_scale(orbits) {

    const semimajor_axes = orbits.map( orbit => orbit.a )
    console.log(semimajor_axes)
    let scaling_factor = 1
    if (2 * Math.max(...semimajor_axes) > Math.min(height, width) / 6) {
        scaling_factor = 0.8 * Math.min(height, width) / 6 / (2*Math.max(...semimajor_axes))
        // rescale(orbits, scaling_factor)
    }
    return scaling_factor

}

function get_params() {

    const params = new URLSearchParams(window.location.search)
    const param_dict = {
        "mu":       [3.986e14],
        "x":        [],
        "y":        [],
        "a":        [5e6, 7380000],
        "e":        [],
        "theta":    [getRandomInt(360), getRandomInt(360)],
        "phi":      [getRandomInt(360), getRandomInt(360)],
    }
    for (const [k,v] of params) {
        param_dict[k].push(parseFloat(v))
    }
    return param_dict

}

function ellipse(x, y, a, e, theta=0, phi=0, color="rgb(255, 255, 255)") {

    const material = new THREE.LineBasicMaterial({ color: color })

    const b = a * ((1 - e**2))**0.5             // Semi-minor axis
    const curve = new THREE.EllipseCurve(
        x, y,
        a, b,
        0, 2*Math.PI,
        false,
    )

    let points = curve.getPoints( 1000 )        // Get 'x' points from the curve
    rotate_points(points, theta, "Y")
    rotate_points(points, phi, "Z")

    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    const ellipse = new THREE.Line(geometry, material)

    scene.add(ellipse)

    console.log(`Rendering ellipse with dimensions:\n
                \ta = ${a}\n
                \te = ${e}`)

}

function draw_hohmann(mu, scaling_factor, color="rgb(111, 201, 252)") {

    const r1 = orbits[orbits.length - 2].a
    const r2 = orbits[orbits.length - 1].a

    const e1 = orbits[orbits.length - 2].e
    const e2 = orbits[orbits.length - 1].e

    const theta2 = orbits[orbits.length - 1].theta
    const phi2 = orbits[orbits.length - 1].phi

    const theta1 = orbits[orbits.length - 2].theta
    const phi1 = orbits[orbits.length - 2].phi

    if (theta1 != theta2 || phi1 != phi2) {
        ellipse(0, 0, r1 * scaling_factor, e1, theta2, phi1, "#ff6be9")
        ellipse(0, 0, r1 * scaling_factor, e1, theta2, phi2, "#66e873")
    }

    const v1 = (mu/r1)**0.5
    const v2 = (mu/r2)**0.5
    
    const vpi_e = (2*mu/r1 * (r2/(r1 + r2)))**0.5
    const valpha_e = (2*mu/r2 * (r1/(r1 + r2)))**0.5

    const delta_vpi = vpi_e - v1
    const delta_valpha = v2 - valpha_e
    const delta_vi = v1 * 2 * (Math.abs(Math.sin((theta2-theta1)/2)) + Math.abs(Math.sin((phi2-phi1)/2)))
    const delta_vtotal = Math.abs(delta_vpi) + Math.abs(delta_valpha) + Math.abs(delta_vi)

    console.log(v1)
    console.log(theta2, theta1)
    console.log(Math.sin((theta2-theta1)/2))
    console.log(Math.sin((phi2-phi1)/2))
    

    console.log(`ΔV = ${Math.round(delta_vtotal * 100) / 100} m/s`)

    // 617 345 7444
    // 212 630 7635

    // 203 773 6176 - New Haven

    // 212 630 6596 

    // Geomtry of the ellipse
    const e = (1 - r1/r2)/(1 + r1/r2)
    const a_transfer = r1/(1 - e)
    const xc = -a_transfer*e

    ellipse(xc * scaling_factor, 0, a_transfer * scaling_factor, e, theta2, phi2, color)

}

function draw_ellipses(param_dict, scaling_factor, color) {

    for (let i = 0; i < param_dict["a"].length; i++) {
        ellipse(
            param_dict["x"][i] * scaling_factor || 0,
            param_dict["y"][i] * scaling_factor || 0,
            param_dict["a"][i] * scaling_factor || 0, 
            param_dict["e"][i] || 0,
            param_dict["theta"][i] || 0,
            param_dict["phi"][i] || 0,
            color,
        )
    }

}


const param_dict = get_params()
let orbits = [{ 
    a: param_dict["a"][0], 
    e: param_dict["e"][0] || 0, 
    theta: param_dict["theta"][0], 
    phi: param_dict["phi"][0],
    color: 'rgb(255, 255, 255)'
},
{ 
    a: param_dict["a"][1], 
    e: param_dict["e"][1] || 0, 
    theta: param_dict["theta"][1], 
    phi: param_dict["phi"][1] ,
    color: 'rgb(255, 255, 255)'
}]
let scaling_factor = get_scale(orbits)

console.log(param_dict, orbits)

draw_ellipses(param_dict, scaling_factor)
draw_hohmann(param_dict["mu"][0], scaling_factor)

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}
animate()


// ------------------------------- ORBIT UI -------------------------------

function clear_canvas() {

    orbits = []
    scene.children = []
    scene.add(new THREE.AxesHelper());

}

function rescale(orbits, scaling_factor) {

    let orbits_old = Array.from(orbits)
    clear_canvas()
    for (const orbit of orbits_old) {
        ellipse(0, 0, orbit.a * scaling_factor, orbit.e, orbit.theta, orbit.phi, orbit.color)
    }


}

const mu_input  = document.getElementById("mu")

const R1_input  = document.getElementById("R1")
const R1_theta  = document.getElementById("R1_theta")
const R1_phi    = document.getElementById("R1_phi")
const e1        = document.getElementById("e")

const R2_input  = document.getElementById("R2")
const R2_alpha  = document.getElementById("R2_alpha")
const R2_phi    = document.getElementById("R2_phi")

const button    = document.getElementById("generate")
const hohmann   = document.getElementById("Hohmann")
const clear     = document.getElementById("Clear")

button.onclick = () => {

    const mu        = parseFloat(mu_input.value)
    const a1        = parseFloat(R1_input.value)
    const e         = parseFloat(e1.value)
    const theta1    = parseFloat(R1_theta.value) * Math.PI/180
    const phi1      = parseFloat(R1_phi.value) * Math.PI/180

    orbits.push({ mu: mu, a: a1, e: e, theta: theta1, phi: phi1, color: 'rgb(255, 255, 255)' })
    scaling_factor = get_scale(orbits)
    ellipse(0, 0, a1 * scaling_factor, e, theta1, phi1)

}

hohmann.onclick = () => {

    const mu = orbits[orbits.length - 1].mu

    const r1 = orbits[orbits.length - 2].a
    const r2 = orbits[orbits.length - 1].a

    const e1 = orbits[orbits.length - 2].e
    const e2 = orbits[orbits.length - 1].e

    const theta2 = orbits[orbits.length - 1].theta
    const phi2 = orbits[orbits.length - 1].phi

    const theta1 = orbits[orbits.length - 2].theta
    const phi1 = orbits[orbits.length - 2].phi

    draw_hohmann(mu, scaling_factor)

}

// 212 630 6596

clear.onclick = clear_canvas

