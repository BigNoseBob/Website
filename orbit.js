// Oliver Rayner
// November 2022

// Draw orbits on html canvas

const body = document.body
const canvas = document.querySelector("canvas")

const width = canvas.width = body.offsetWidth * 0.5 // window.innerWidth
const height = canvas.height = body.offsetHeight // window.innerHeight * 0.7

console.log(window.innerWidth)

// canvas.style.width = body.offsetWidth
// canvas.style.height = body.offsetHeight * 0.7

const xc = width/2
const yc = height/2

const ctx = canvas.getContext("2d")
ctx.lineWidth = Math.min(width, height)/400
ctx.font = `${Math.min(width, height)/30}px monospace`;
const text_x = Math.min(width, height)/30
const text_y = text_x * 2

// Orbital Mechanics stuff
const r = (a, e, theta) => a*(1 - e^2)/(1 + e*Math.cos(theta))

const params = new URLSearchParams(window.location.search)
const param_dict = { "mu": [], "x": [], "y": [], "a": [], "e": [] }
for (const [k,v] of params) {
    console.log(k, v)
    param_dict[k].push(parseFloat(v))
}
let scaling_factor = 1
if (2 * Math.max(...param_dict["a"]) > Math.min(height, width)) {
    scaling_factor = 0.8 * Math.min(height, width) / (2*Math.max(...param_dict["a"]))
}

/**
 * 
 * @param {float} a semi-minor axis
 * @param {float} e eccentricity
 */
function draw_orbit(x, y, a, e) {

    x = scaling_factor * x
    y = scaling_factor * y
    a = scaling_factor * a

    const b = a * (1 - e**2)**0.5       // semi-major axis (m)

    ctx.beginPath()
    ctx.strokeStyle = "rgb(255, 255, 255)"
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
function hohmann(mu, r1, r2) {

    const v1 = (mu/r1)**0.5
    const v2 = (mu/r2)**0.5
    
    const vpi_e = (2*mu/r1 * (r2/(r1 + r2)))**0.5
    const valpha_e = (2*mu/r2 * (r1/(r1 + r2)))**0.5

    const delta_vpi = vpi_e - v1
    const delta_valpha = v2 - valpha_e
    const delta_vtotal = Math.abs(delta_vpi) + Math.abs(delta_valpha)
    console.log(`DeltaV = ${Math.round(delta_vtotal * 100) / 100} m/s`)

    // Geomtry of the ellipse
    const e = (1 - r1/r2)/(1 + r1/r2)
    const a_transfer = r1/(1 - e)
    const xc = -a_transfer*e

    draw_orbit(xc, 0, a_transfer, e)

    ctx.beginPath()
    ctx.fillStyle = "rgb(255, 255, 255)"
    ctx.fillText(`DeltaV = ${Math.round(delta_vtotal * 100) / 100} m/s`, text_x, text_y)

}

for (i = 0; i < param_dict["a"].length; i++) {
    draw_orbit(
        param_dict["x"][i] || 0,
        param_dict["y"][i] || 0,
        param_dict["a"][i] || 0, 
        param_dict["e"][i] || 0
        )
}
const mu = param_dict["mu"][0] || 3.986 * 10**14

hohmann(mu, param_dict["a"][0], param_dict["a"][1])

