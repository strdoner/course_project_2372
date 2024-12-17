import React from 'react'
import defaults from 'chart.js/auto'
import {Line} from "react-chartjs-2"


const Chart = ({keys, index, hidePoints}) => {
    const data = {
        datasets: []
    }
    return (
        <div className='chart' id={`chart_${index}`}>
            {hidePoints
                ?
                <Line
                    data={{
                        labels:keys.x,
                        datasets: [{
                            data: keys.y,
                            tension: 0.4,
                            backgroundColor: '#757575',
                            borderColor: '#757575',
                            pointBorderColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            pointHoverBackgroundColor: '#757575',
                        }]
                    }}
                    options={{
                        plugins: {
                            legend: {
                                display: false
                            },
                            maintainAspectRatio : false

                        }
                    }}
                />
                :
                <Line
                    data={{
                        labels:keys.x,
                        datasets: [{
                            data: keys.y,
                            tension: 0.4,
                            backgroundColor: '#757575',
                            borderColor: '#757575',
                        }]
                    }}
                    options={{
                        plugins: {
                            legend: {
                                display: false
                            },
                            maintainAspectRatio : false

                        }
                    }}
                />

            }

        </div>
    )
}


export default Chart