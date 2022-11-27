// Oliver Rayner
// November 2022

// ThreeJS Canvas for Hohmann Transfer Project

import * as THREE from "../node_modules/three/build/three.module.js"
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js"
import { rotate_points } from "./rotation_matricies.js"

const planet_json = await fetch('./js/planet_data.json')
const PLANET_DATA = await planet_json.json()

export class Canvas {

    /**
     * @param container HTML <div> element
     */
    constructor(window, container, fov=45, color="#171515") {
        
        // Get scene parameters
        this.container  = container
        this.height     = container.offsetHeight
        this.width      = container.offsetWidth

        // Initalise Three.JS renderer
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setClearColor(new THREE.Color(color), 0)
        this.renderer.setSize(this.width, this.height)
        this.container.appendChild(this.renderer.domElement)

        this.camera = new THREE.PerspectiveCamera(fov, this.width / this.height, 0.01, 10e6)
        window.addEventListener("resize", () => {
            this.width = this.container.offsetWidth
            this.height = this.container.offsetHeight
            this.camera.aspect = this.width / this.height
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(this.width, this.height)
        })

        // Orbit Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.camera.position.set(-40, 15, 105)
        this.camera.lookAt(0, 0, 0)
        this.controls.update()

        this.scene = new THREE.Scene()
        this.scene.add(new THREE.AxesHelper())

        // Objects in Scene
        this.orbits = []
        this.scaling_factor = 1
        this.mu = 4.282837e13       // Mars gravitational parameter
        this.set_center_body({ mu: this.mu })

        // Start rendering
        this.animate = () => {
            requestAnimationFrame( this.animate )
            this.controls.update()
            
            for (const obj of this.scene.children) {
                if ('update' in obj) obj.update()
            }

            this.renderer.render(this.scene, this.camera)
        }

    }

    // ------------------------- Canvas Controls -------------------------

    clear() {
        this.orbits = []
        this.scene.children = []
        this.scene.add(new THREE.AxesHelper());
        this.set_center_body({ mu: this.mu })
    }

    rescale() {
        const orbits_copy = Array.from(this.orbits)
        const max_a = Math.max(...this.orbits.map( orbit => orbit.a ))
    
        if (2 * max_a > Math.min(this.height, this.width) / 7 && this.scaling_factor > 0.8 * Math.min(this.height, this.width) / (7*2*max_a)) {
            this.scaling_factor = 0.8 * Math.min(this.height, this.width) / (7*2*max_a)
            this.clear()
            for (const orbit of orbits_copy) {
                this.ellipse(orbit)
            }
        }
    }

    // ------------------------ Orbital Mechanics ------------------------

    ellipse({ a, e, x, y, theta, phi, color }) {

        a = a || 10
        e = e || 0
        x = x || 0
        y = y || 0
        theta = theta || 0
        phi = phi || 0
        color = color || 'rgb(255, 255, 255)'
        
        const orbit = { a, e, x, y, theta, phi, color }
        this.orbits.push(orbit)
        this.rescale()

        const material = new THREE.LineBasicMaterial({ color: color })

        const b = a * ((1 - e**2))**0.5             // Semi-minor axis
        const curve = new THREE.EllipseCurve(
            (x + a*e) * this.scaling_factor, y * this.scaling_factor,
            a * this.scaling_factor, b * this.scaling_factor,
            0, 2*Math.PI,
            false,
        )

        let points = curve.getPoints( 1000 )        // Get 'x' points from the curve
        rotate_points(points, theta * Math.PI/180, "Y")
        rotate_points(points, phi * Math.PI/180, "Z")

        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const ellipse = new THREE.Line(geometry, material)
        this.scene.add(ellipse)

        return orbit

    }

    hohmann(o1, o2) {

        // Geometry
        const e = (1 - o1.a/o2.a)/(1 + o1.a/o2.a)
        const a_transfer = o1.a/(1 - e)
        const xc = -a_transfer*e

        // Velocities
        const v1 = (this.mu/o1.a)**0.5
        const v2 = (this.mu/o2.a)**0.5

        const vpi_e = (2*this.mu/o1.a * (o2.a/(o1.a + o2.a)))**0.5
        const valpha_e = (2*this.mu/o2.a * (o1.a/(o1.a + o2.a)))**0.5

        const delta_vpi = vpi_e - v1
        const delta_valpha = v2 - valpha_e
        const delta_vi = v1 * 2 * (Math.abs(Math.sin((o2.theta-o1.theta)*Math.PI/180/2))) // + Math.abs(Math.sin((o2.phi-o1.phi)*Math.PI/180/2)))
        const delta_vtotal = Math.abs(delta_vpi) + Math.abs(delta_valpha) + Math.abs(delta_vi)

        // Draw Orbits
        if (o1.theta != o2.theta || o1.phi != o2.phi) {
            // this.ellipse({ a:o1.a, e:o1.e, theta:o2.theta, phi:o1.phi, color:"#ff6be9" })
            this.ellipse({ a:o1.a, e:o1.e, theta:o2.theta, phi:o2.phi, color:"#66e873" })
        }
        this.ellipse({ x:xc, a:a_transfer, e:o2.e, theta:o2.theta, phi:o2.phi, color:'rgb(111, 201, 252)' })
        const parameters = { 
            v1: v1, 
            v2: v2, 
            vpi: vpi_e, 
            valpha: valpha_e,
            delta_vpi: delta_vpi, 
            delta_valpha: delta_valpha, 
            delta_vi: delta_vi, 
            delta_vtotal: delta_vtotal,
            a: a_transfer,
            e: e,
        }
        Object.entries(parameters).forEach( (k, v) => parameters[k[0]] = Math.round(k[1] * 100)/100)
        return parameters

    }

    // ------------------------ Look Good Stuff ------------------------

    sphere(radius, texture_path='js/textures/earth.jpg') {

        const geometry = new THREE.SphereGeometry(radius * this.scaling_factor, 32, 16)
        // const material = new THREE.MeshBasicMaterial({ color: '#34c6eb' })

        const texture = new THREE.TextureLoader().load(texture_path)
        const material = new THREE.MeshBasicMaterial({ map: texture })
        const sphere = new THREE.Mesh(geometry, material)

        this.scene.add(sphere)
        return sphere

    }

    planet({ mu, x, y, z }) {    // Should add position to optional arguments

        mu          = mu || 3.986e14

        const texture_folder = 'js/textures'
        const planet_data = this.body_from_mu(mu) || { name: 'unknown', mu: mu, alpha: 0, radius: 4e5 }
        const body = planet_data.name || "earth"
        const axis_tilt = planet_data.alpha || 26.34
        const radius = planet_data.radius || 6.371e6
        
        const texture_path = texture_folder + `/${body}.jpg` || texture_folder + `/earth.jpg`
        const sphere = this.sphere(radius, texture_path)

        const quaternion = new THREE.Quaternion()
        quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, -1), axis_tilt * Math.PI/2);
        sphere.applyQuaternion(quaternion)

        sphere.update = () => {
            const quaternion = new THREE.Quaternion()
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.001 * Math.PI/2)
            sphere.quaternion.multiplyQuaternions(sphere.quaternion, quaternion)
        }
        return sphere

    }

    set_center_body({ mu }) {
        if (this.body) this.body.removeFromParent()
        mu          = mu || this.mu
        this.body = this.planet({ mu: mu })
    }

    body_from_mu(mu) {

        const error_bound = 0.05
        const within_bound = (known) => Math.abs(mu - known) <= error_bound * known

        for (const v of Object.values(PLANET_DATA)) {
            if (within_bound(v.mu)) return v
        }
        return null


    }

}
