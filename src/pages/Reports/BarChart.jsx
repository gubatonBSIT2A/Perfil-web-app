import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function BarChart({ chartData }) {
  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          // callback: function (value) {
          //   return value + "%";
          // },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Barangays with positive cases",
      },
    },
  };
  return <Bar data={chartData} options={options} />;
}
