import React, { useEffect, useRef, useState } from 'react'
import { GetTileStyle } from '../../../pages/[region]/[summoner]';
import Chartjs from 'chart.js';
import css from 'styled-jsx/css';
import { IColorScheme, useColorStore } from '../../GlobalStyles';

const StatisticsTile = () => {
    const Selected = useColorStore(state => state.Selected);
    const { className, styles } = GetTileStyle(Selected);

    return (
        <article className={className}>
            <div className="content">
                <p style={{margin: '0px'}}className={className + " title"}>
                    Elo tracker
                </p>
                <Chart />
            </div>
            {styles}
        </article>
    )
}

const chartConfig = {
    type: "line",
    scaleFontColor: "#FFFFFF",
    borderColor: '#ffffff',
    lineColor: '#ffffff',
    data: {
        labels: ["12/03/20", "13/03/20", "14/03/20", "15/03/20", "17/03/20", "16/03/20"],
        datasets: [
            {
                label: "Solo Duo (LP)",
                data: [12, 19, 3, 5, 2, 3],
                borderColor: "rgba(200, 40, 80, 1)",
                borderWidth: 1,
                backgroundColor: "rgba(0, 0, 0, 0.1)"

            },
            {
                label: "Ranked Flex (LP)",
                data: [3, 4, 7, 8, 7, 9],
                borderColor: "rgba(40, 80, 200, 1)",
                borderWidth: 1,
                backgroundColor: "rgba(0, 0, 0, 0.1)"
            }
        ]
    },
    options: {
        legend: {
            labels: {
                fontColor: '#eeeeee'
            },
        },
        scales: {
            yAxes: [
                {
                    gridLines: {
                        color: "rgba(0,0,0,0.1)"
                    },
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#eeeeee'
                    }
                }
            ],
            xAxes: [
                {
                    gridLines: {
                        color: "rgba(0,0,0,0.1)"
                    },
                    ticks: {
                        fontColor: '#eeeeee'
                    }
                }
            ],
            gridLines: {
                color: '#ffffff'
            }
        }
    }
};

const GetStatsStyles = (Selected: IColorScheme) => css.resolve`
    div {
        background-color: ${Selected.secondary};
        color: ${Selected.color};
        
        margin: 15px 0px 0px 0px;
        padding: 10px;
        ${Selected.shadows && `box-shadow: inset 0px 0px 9px 1px rgba(0,0,0,0.47)`};
        width: 600px;
        height: 300px;
        min-width: 600px;
        min-height: 300px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: flex-start;

    }
`

const Chart = () => {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    console.log(chartInstance);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance =
                new Chartjs(chartContainer.current, chartConfig);
            setChartInstance(newChartInstance);
        }
    }, [chartContainer]);

    // const updateDataset = (datasetIndex, newData) => {
    //     chartInstance.data.datasets[datasetIndex].data = newData;
    //     chartInstance.update();
    // };

    // const onButtonClick = () => {
    //     const data = [1, 2, 3, 4, 5, 6];
    //     updateDataset(0, data);
    // };
    
    const Selected = useColorStore(state => state.Selected);
    const { className, styles } = GetStatsStyles(Selected);

    return (
        <div className={className}>
            <canvas ref={chartContainer} />
            {styles}
        </div>
    );
};


export default StatisticsTile;