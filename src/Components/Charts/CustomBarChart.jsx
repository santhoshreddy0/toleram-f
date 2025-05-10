// MatchBarChart.js
import React from 'react';
import Chart from 'react-apexcharts';

const MatchBarChart = () => {
  // Your match data
  const matchData = [
    {
      matchId: 5,
      matchTitle: "new match 3",
      totalAmount: 86000,
      totalPoints: -26000,
      totalBets: 2,
    },
    {
      matchId: 6,
      matchTitle: "mintu new match",
      totalAmount: 50000,
      totalPoints: -50000,
      totalBets: 1,
    },
    {
      matchId: 7,
      matchTitle: "new match test ",
      totalAmount: 0,
      totalPoints: 0,
      totalBets: 0,
    },
  ];

  // Series: totalAmount and totalPoints
  const series = [
    {
      name: 'Total Amount',
      data: matchData.map((match) => match.totalAmount),
    },
    {
      name: 'Total Points',
      data: matchData.map((match) => match.totalPoints),
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 430,
      background: 'transparent', // Keep background transparent
      foreColor: '#e0e0e0', // Light text for dark background
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#ffffff'],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#2d3748'], // dark gray stroke (to match tailwind gray-800)
    },
    tooltip: {
      theme: 'dark', // Dark tooltip for consistency
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: matchData.map((match) => match.matchTitle),
      labels: {
        style: {
          colors: '#cbd5e0', // Light gray text (tailwind gray-300)
        },
      },
      axisBorder: {
        color: '#4a5568', // Tailwind gray-700
      },
      axisTicks: {
        color: '#4a5568',
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#cbd5e0',
        },
      },
    },
    legend: {
      labels: {
        colors: '#e2e8f0', // Tailwind gray-200
      },
    },
  };
  

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={430} />
    </div>
  );
};

export default MatchBarChart;
