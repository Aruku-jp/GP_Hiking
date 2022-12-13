import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import {compareDate, getDayAndMonth, getLastNDays} from '../src/DateFunctions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'My Hiked Distance',
    },
  },
};

export function LineChart( {dataSet}) {

    const [period, setPeriod] = React.useState<number>(40);
    const [label, setLabel] = useState<string>(`Last ${period} days`)

    const handlePeriod = (event: React.MouseEvent<HTMLElement>, newPeriod: number) => {
      setPeriod(newPeriod);
      setLabel(`Last ${period} days`);
      getLastNDays(period);
    };

    let lastFullDays = getLastNDays(period);
    let labels = getDayAndMonth(lastFullDays);

    let res : number[] =[];


    for (let i = 0; i < lastFullDays.length; i++){
        if (i === 0)
            res[i] = 0;
        else res[i] = res[i-1];
        for (let j = 0; j < dataSet.length; j ++){
            
            if (compareDate(lastFullDays[i], dataSet[j].date)){
                res[i] += parseFloat(dataSet[j].length);
            }
        }
    }

    const data = {
        labels,
        datasets: [
          {
            fill: true,
            label: label,
            data: res,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
  return (
    
    <>
        <Line options={options} data={data} />
        
        <ToggleButtonGroup
            value={period}
            exclusive
            onChange={handlePeriod}
            aria-label="text alignment"
        >
            <ToggleButton value={30} aria-label="monthly">
                Monthly
            </ToggleButton>
            <ToggleButton value={7} aria-label="weekly">
                Weekly
            </ToggleButton>

        </ToggleButtonGroup></>
    );
}