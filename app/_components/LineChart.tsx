"use client"
import { useEffect, useRef } from 'react';

import Chart from 'chart.js/auto';

export default function LineChart({data}:any) {
 const chartRef = useRef<any>(null);

 useEffect(() => {
        // pass subjects from the main file as props
    const subjects = [
      { subject: 'Calculus', correct: 70, wrong: 30 },
      { subject: 'Algebra', correct: 85, wrong: 15 },
      { subject: 'Geometry', correct: 60, wrong: 40 },
    ];

    const labels = subjects.map(subject => subject.subject);
    const correctData = subjects.map(subject => subject.correct);
    const wrongData = subjects.map(subject => subject.wrong);

    const ctx = chartRef.current.getContext('2d');
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Correct',
            data: correctData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
          {
            label: 'Wrong',
            data: wrongData,
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
 }, []);
 return <canvas  ref={chartRef} />;
}

