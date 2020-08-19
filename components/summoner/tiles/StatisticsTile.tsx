import React, { useEffect, useRef, useState, FC } from 'react'
import { GetTileStyle } from '../../../pages/[region]/[summoner]';
import Chartjs from 'chart.js';
import css from 'styled-jsx/css';
import { IColorScheme, useColorStore } from '../../GlobalStyles';

const StatisticsTile: FC = () => {
    const Selected = useColorStore(state => state.Selected);
    const { className, styles } = GetTileStyle(Selected);

    return (
        <article className={className}>
            <div className="content">
                <p className={className + " title"}>
                    Elo tracker
                </p>
                <p
                    className={className + " subtitle"}
                    style={{ margin: "-20px 0px 0px 0px" }}>
                    Solo duo
                </p>
                <DrawChart />
            </div>
            {styles}
        </article>
    )
}

const DrawChart: FC = () => <Chart />

const chartConfig = {
    type: "line",
    scaleFontColor: "#FFFFFF",
    data: {
        labels: ["12/03/20", "13/03/20", "14/03/20", "15/03/20", "17/03/20", "16/03/20"],
        datasets: [
            {
                label: "Solo Duo (LP)",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    "rgba(128, 32, 64, 0.4)",
                    "rgba(128, 32, 64, 0.4)",
                    "rgba(128, 32, 64, 0.4)",
                    "rgba(128, 32, 64, 0.4)",
                    "rgba(128, 32, 64, 0.4)",
                    "rgba(128, 32, 64, 0.4)"
                ],
                borderColor: [
                    "rgba(128, 32, 64, 1)",
                    "rgba(128, 32, 64, 1)",
                    "rgba(128, 32, 64, 1)",
                    "rgba(128, 32, 64, 1)",
                    "rgba(128, 32, 64, 1)",
                    "rgba(128, 32, 64, 1)"
                ],
                borderWidth: 1
            },
            {
                label: "Ranked Flex (LP)",
                data: [3, 4, 7, 8, 7, 9],
                backgroundColor: [
                    "rgba(32, 64, 128, 0.4)",
                    "rgba(32, 64, 128, 0.4)",
                    "rgba(32, 64, 128, 0.4)",
                    "rgba(32, 64, 128, 0.4)",
                    "rgba(32, 64, 128, 0.4)",
                    "rgba(32, 64, 128, 0.4)"
                ],
                borderColor: [
                    "rgba(32, 64, 128, 1)",
                    "rgba(32, 64, 128, 1)",
                    "rgba(32, 64, 128, 1)",
                    "rgba(32, 64, 128, 1)",
                    "rgba(32, 64, 128, 1)",
                    "rgba(32, 64, 128, 1)"
                ],
                borderWidth: 1
            }
        ]
    },
    options: {
        legend: {
            labels: {
                fontColor: '#AAAAAA'
            },
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#AAAAAA'
                    }
                }
            ],
            xAxes: [
                {
                    ticks: {
                        fontColor: '#AAAAAA'
                    }
                }
            ]
        }
    }
};

const GetStatsStyles = (Selected: IColorScheme) => css.resolve`
    div {
        background-color: ${Selected.secondary};
        color: ${Selected.color};
        
        margin: 15px 0px 0px 0px;
        padding: 10px;
        box-shadow: inset 0px 0px 9px 1px rgba(0,0,0,0.47);
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

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance =
                new Chartjs(chartContainer.current, chartConfig);
            setChartInstance(newChartInstance);
        }
    }, [chartContainer]);

    const updateDataset = (datasetIndex, newData) => {
        chartInstance.data.datasets[datasetIndex].data = newData;
        chartInstance.update();
    };

    const onButtonClick = () => {
        const data = [1, 2, 3, 4, 5, 6];
        updateDataset(0, data);
    };
    
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