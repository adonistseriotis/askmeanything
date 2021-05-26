import React from "react"
import { Pie } from "react-chartjs-2"

const PieChart = ({labels,label,data}) => {
    const barlabels = labels
    const barlabel = label
    const bardata = data

    const state = {
        labels: barlabels,
        datasets: [
            {
            
            label: barlabel,
            backgroundColor: ["#bc2c1a",
                "#938ba1",
                "#fa8334",
                "#a4af69"
            ],
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 0,
            data: bardata
        }
        ]
    }

    return (
        <div className = "pie">
            <Pie data = {state}/> 


        </div>
    )
}

export default PieChart;