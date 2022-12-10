// Oliver Rayner
// December 2022

// PTG Radar Chart

import { Chart } from '../node_modules/chart.js/auto/auto.js'
const ptg_json = await fetch('./js/PTG_data.json').json()

export class PTGChart {

    constructor() {

        const json_data = JSON.parse(ptg_json)
        const labels = json_data.labels
        const brothers = json.brothers
        const data = { labels: labels, datasets: [] }
        
    }

    add_dataset(name) {

        this.data.datasets.push({
            
            label: name,
            data: this.brothers[name],

            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'

        })

    }

} 