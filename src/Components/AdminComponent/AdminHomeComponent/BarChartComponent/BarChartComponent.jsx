import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../AdminHomeComponent.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartComponent = ({data,charTitle}) => {

  const labels = data.map(item => item._id);  
  const counts = data.map(item => item.count); 
  
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Number of Employees',
        data: counts,
        backgroundColor: '#2196F3',   
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: 'rgb(202, 198, 198)', 
        },
        grid: {
          color: function (context) {
            if (context.tick && context.tick.value === 0) {
              return 'rgb(202, 198, 198)'; 
            }
            return 'transparent'; 
          },
        },
      },
      y: {
        ticks: {
          color: 'rgb(202, 198, 198)', 
        },
        grid: {
          color: function (context) {
            if (context.tick && context.tick.value === 0) {
              return 'rgb(202, 198, 198)'; 
            }
            return 'transparent'; 
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: true,
        text: charTitle,
        color: 'white', 
        font: {
          size: 18,  
          weight: 'normal'    
        },
      },
    },
  };

  return (
      <Bar data={chartData} options={chartOptions} />
  );
};

export default BarChartComponent;
