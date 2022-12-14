// Oliver Rayner
// December 2022

// PTG Radar Chart

import { Chart } from '../node_modules/chart.js/auto/auto.js'
const json = await fetch('./js/PTG_data.json').then( res => res.json() )

import * as THREE from "../node_modules/three/build/three.module.js"
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js"
import { OBJLoader } from "../node_modules/three/examples/jsm/loaders/OBJLoader.js"
import { MTLLoader } from "../node_modules/three/examples/jsm/loaders/MTLLoader.js"

export class PTGChart {

    constructor(window, canvas) {

        this.window = window
        this.canvas = canvas
        this.labels = json.labels
        this.brothers = json.brothers
        this.data = { labels: this.labels, datasets: [] }
        
    }

    add_dataset(name, hidden=false, color=undefined) {

        color = color || '#' + Math.floor(Math.random()*16777215).toString(16);

        // const data = this.brothers[name].map((num) => `${num}`)
        // console.log(data)

        this.data.datasets.push({
            
            label: name,
            data: this.brothers[name],

            fill: true,
            backgroundColor: color + '80',
            borderColor: color,
            pointBackgroundColor: color,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: color,
            hidden: hidden,

        })

    }

    create_chart() {

        this.chart = new Chart(
            this.canvas,
            {
                type: 'radar',
                data: this.data,
                options: {
                    element: {
                        line: {
                            borderWidth: 3
                        }
                    },
                    scales: {
                        r: {
                            display: true,
                            backgroundColor: '#18181700',
                            ticks: {
                                backdropColor: '#181817',
                                display: false,
                            },
                            min: 0,
                            max: 8,
                        }
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                        }
                    },
                    maintainAspectRatio: true,
                }
            }
        )

    }

    update() {

        this.chart.update()

    }

    // ---------------------- 3D Rendering ----------------------

    initialize_renderer(container, brother_name) {

        // Initalise Three.JS renderer
        let width     = container.offsetWidth
        let height    = container.offsetHeight

        const renderer = new THREE.WebGLRenderer()
        renderer.setClearColor(new THREE.Color("#171515"), 0)
        renderer.setSize(width, height)
        container.appendChild(renderer.domElement)

        // Orbit Controls
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 10e6)
        const controls = new OrbitControls(camera, renderer.domElement)

        controls.autoRotate = true
        controls.autoRotateSpeed = 1
        controls.enablePan = false
        controls.enableZoom = false

        camera.position.set(7, 2.5, 7)
        camera.lookAt(0, 0, 0)
        controls.update()

        const scene = new THREE.Scene()
        // scene.add(new THREE.AxesHelper())
    
        const spotLight = new THREE.SpotLight()
        spotLight.position.set(15, 15, 15)
        spotLight.intensity = 15
        // spotLight.castShadow = true

        const light = new THREE.AmbientLight()
        light.intensity = 5
        scene.add(spotLight)

        this.window.addEventListener("resize", () => {
            width = container.offsetWidth
            height = container.offsetHeight
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize(width, height)
        })

        const animate = () => {

            requestAnimationFrame( animate )
            controls.update()

            const camera_pos = new THREE.Vector3()
            camera.getWorldPosition(camera_pos)
            spotLight.position.copy(camera_pos)

            renderer.render(scene, camera)

        }
        animate()
        
        const obj_name = json.models[brother_name]

        const mtlLoader = new MTLLoader()
        mtlLoader.setMaterialOptions({ normalizeRGB: false })
        mtlLoader.load(`./models/${obj_name}.mtl`, function (mats) {
            mats.preload()

            for (let mat of Object.values(mats.materials)) {
                mat.shininess = 20
                mat.reflectivity = 0.2
                mat.specular = new THREE.Color("#010101")
                // mat.emissive = new THREE.Color("#2e2929")
            }

            const loader = new OBJLoader()
            loader.setMaterials(mats)
            loader.load(`./models/${obj_name}.obj`, function (obj) {

                const box = new THREE.Box3().setFromObject(obj)
                const measure = new THREE.Vector3()
                box.getSize(measure)
                console.log(box.max)

                console.log(measure)
                obj.position.set(0, -(box.max.y)/2, 0)
                const max_dim = Math.max(measure.x, measure.y, measure.z)
                camera.position.set(1.2*max_dim, measure.y/4, 1.2*max_dim )

                scene.add(obj)
                console.log('loaded')

            }, function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded')
            }, function (err) {
                console.log(err)
            })
        })

    }

} 