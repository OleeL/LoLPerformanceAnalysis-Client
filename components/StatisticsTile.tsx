import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../Shared/StoreContext';
import { TStore } from '../Shared/Store';
import styled from 'styled-components';
import { Tile } from '../pages/[region]/[summoner]';
import Chartjs from 'chart.js';

const Highlight = styled.div`
    background: white;
    margin: 15px 0px 0px 0px;
    color: black;
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
`

const StatisticsTile: React.FC = () => {

    const store: TStore = useStore();

    return (
        <Tile className="tile is-child notification is-info">
          <div className="content">
            <p className="title">Elo tracker</p>
            <p className="subtitle" style={{margin: "-20px 0px 0px 0px"}}>Solo duo</p>
            <Highlight >
                <Chart />
            </Highlight>
          </div>
        </Tile>
    )
}

const chartConfig = {
    type: "line",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  };
  
const Chart = () => {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
        const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
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

    return (
        <div>
            <canvas ref={chartContainer} />
        </div>
    );
};


export default StatisticsTile;