// Oliver Rayner
// December 2022

// PTG Radar Chart

import { Chart } from '../node_modules/chart.js/auto/auto.js'
const json = await fetch('./js/PTG_data.json').then( res => res.json() )

export class PTGChart {

    constructor(window, container) {

        this.element = container
        this.labels = json.labels
        this.brothers = json.brothers
        this.data = { labels: this.labels, datasets: [] }
        
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

    create_chart() {

        this.chart = new Chart(
            document.getElementById('chart'),
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
                            backgroundColor: '#181817',
                            ticks: {
                                backdropColor: '#181817',
                                display: false,
                            },
                            min: 0,
                            max: 8,
                        }
                    },
                    responsive: true,
                    // maintainAspectRatio: false,
                }
            }
        )

    }

} 