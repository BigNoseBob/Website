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

    add_dataset(name, color="#f5f3f2") {

        this.data.datasets.push({
            
            label: name,
            data: this.brothers[name],

            fill: true,
            backgroundColor: color + '80',
            borderColor: color,
            pointBackgroundColor: color,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: color

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

} 