// Oliver Rayner
// November 2022

// Draw orbits on html canvas

const body = document.body
const canvas = document.querySelector("canvas")

const width = canvas.width = body.offsetWidth * 0.5 // window.innerWidth
const height = canvas.height = body.offsetHeight // window.innerHeight * 0.7

const xc = width/2
const yc = height/2

const ctx = canvas.getContext("2d")
ctx.lineWidth = Math.min(width, height)/400
ctx.font = `${Math.min(width, height)/30}px monospace`;
const text_x = Math.min(width, height)/30
const text_y = text_x * 2

const params = new URLSearchParams(window.location.search)
const param_dict = { 
    "mu":   [3.986e14], 
    "x":    [], 
    "y":    [], 
    "a":    [6780000, 7380000], 
    "e":    [] 
}
for (const [k,v] of params) {
    console.log(k, v)
    param_dict[k].push(parseFloat(v))
}
let scaling_factor = 1
if (2 * Math.max(...param_dict["a"]) > Math.min(height, width)) {
    scaling_factor = 0.8 * Math.min(height, width) / (2*Math.max(...param_dict["a"]))
}

const mu_input = document.getElementById("mu")
const R1_input = document.getElementById("R1")
const R2_input = document.getElementById("R2")
const generate_button = document.getElementById("generate")

const v_pi = document.getElementById("vpi")
const v_alpha = document.getElementById("valpha")
const v_r1 = document.getElementById("vr1")
const v_r2 = document.getElementById("vr2")
const deltav = document.getElementById("deltav")
const eccentricity = document.getElementById("eccentricity")
const a = document.getElementById("semi-major")

/**
 * 
 * @param {float} a semi-minor axis
 * @param {float} e eccentricity
 */
function draw_orbit(x, y, a, e, scaling_factor = 1, orbit_color = "rgb(255, 255, 255)") {

    x = scaling_factor * x
    y = scaling_factor * y
    a = scaling_factor * a

    const b = a * (1 - e**2)**0.5       // semi-major axis (m)

    ctx.beginPath()
    ctx.strokeStyle = orbit_color
    ctx.ellipse(xc + x, yc - y, a, b, 0, 0, 2*Math.PI)
    ctx.stroke()

    ctx.beginPath()
    ctx.fillStyle = "rgb(0, 255, 0)"
    ctx.arc(xc + x + a*e, yc - y, 2, 0, 2*Math.PI)
    ctx.fill()

    ctx.beginPath()
    ctx.fillStyle = "rgb(255, 0, 0)"
    ctx.arc(xc + x - a*e, yc - y, 2, 0, 2*Math.PI)
    ctx.fill()

    ctx.beginPath()
    ctx.fillStyle = "rgb(255, 255, 255)"
    ctx.arc(xc + x, yc - y, 2, 0, 2*Math.PI)
    ctx.fill()
    
}

/**
 * 
 * Ellipse for Hohmann Transfer from circular orbit of r1 to circular orbit r2
 * 
 * @param {*} mu 
 * @param {*} r1 radius of inital circular orbit
 * @param {*} r2 radius of final circular orbit
 */
function hohmann(mu, r1, r2, scaling_factor, orbit_color) {

    const v1 = (mu/r1)**0.5
    const v2 = (mu/r2)**0.5

    v_r1.innerText = `${Math.round(v1 * 100) / 100} m/s`
    v_r2.innerText = `${Math.round(v2 * 100) / 100} m/s`
    
    const vpi_e = (2*mu/r1 * (r2/(r1 + r2)))**0.5
    const valpha_e = (2*mu/r2 * (r1/(r1 + r2)))**0.5

    v_pi.innerText = `${Math.round(vpi_e * 100) / 100} m/s`
    v_alpha.innerText = `${Math.round(valpha_e * 100) / 100} m/s`

    const delta_vpi = vpi_e - v1
    const delta_valpha = v2 - valpha_e
    const delta_vtotal = Math.abs(delta_vpi) + Math.abs(delta_valpha)
    deltav.innerText = `${Math.round(delta_vtotal * 100) / 100} m/s`

    console.log(`ΔV = ${Math.round(delta_vtotal * 100) / 100} m/s`)

    // Geomtry of the ellipse
    const e = (1 - r1/r2)/(1 + r1/r2)
    const a_transfer = r1/(1 - e)
    const xc = -a_transfer*e

    eccentricity.innerText = `${Math.round(e * 100) / 100}`
    a.innerText = `${Math.round(a_transfer * 100) / 100}`

    draw_orbit(xc, 0, a_transfer, e, scaling_factor, orbit_color)

    // ctx.beginPath()
    // ctx.fillStyle = "rgb(255, 255, 255)"
    // ctx.fillText(`ΔV = ${Math.round(delta_vtotal * 100) / 100} m/s`, text_x, text_y)

}

for (i = 0; i < param_dict["a"].length; i++) {
    draw_orbit(
        param_dict["x"][i] || 0,
        param_dict["y"][i] || 0,
        param_dict["a"][i] || 0, 
        param_dict["e"][i] || 0,
        scaling_factor
        )
}

let mu = param_dict["mu"][0] || 3.986 * 10**14
hohmann(mu, param_dict["a"][0], param_dict["a"][1], scaling_factor, "rgb(111, 201, 252)")

generate_button.onclick = () => {

    mu = parseFloat(mu_input.value) || 3.986 * 10**14
    r1 = parseFloat(R1_input.value)
    r2 = parseFloat(R2_input.value)

    let scaling_factor = 1
    if (2 * Math.max(r1, r2) > Math.min(height, width)) {
        scaling_factor = 0.8 * Math.min(height, width) / (2*Math.max(r1, r2))
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw_orbit(0, 0, r1, 0, scaling_factor)
    draw_orbit(0, 0, r2, 0, scaling_factor)
    hohmann(mu, r1, r2, scaling_factor, "rgb(111, 201, 252)")

}
