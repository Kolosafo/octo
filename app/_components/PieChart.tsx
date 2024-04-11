"use client"

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }:any) => {
 const chartRef = useRef<any>(null);

 useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.map(item => item.subject),
          datasets: [{
            label: 'Performance',
            data: data.map(item => item.correct),
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(201, 203, 207, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'User Performance'
            }
          }
        },
      });
    }
 }, [data]);

 return <canvas ref={chartRef} />;
};

export default PieChart;