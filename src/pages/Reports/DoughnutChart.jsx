import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
const options = {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: false,
    },
    title: {
      display: true,
      text: "Positive cases by gender",
    },
    datalabels: {
      //set color to white
      labels: {
        value: {
          color: 'white'
        }
      },
      display: function (context) {
        return context.dataset.data[context.dataIndex] !== 0.0;
      },
      align: "top",
      formatter: (value, context) => {
        const datapoints = context.chart.data.datasets[0].data;
        function totalSum(total, datapoint) {
          return total + datapoint;
        }
        const totalPercentage = datapoints.reduce(totalSum, 0);
        const percentageValue = ((value / totalPercentage) * 100).toFixed(2);
        return `${percentageValue}%`;
      },
    },
  },
};
const plugins = [ChartDataLabels];
export default function DoughnutChart({ chartData }) {
  return <Doughnut data={chartData} options={options} plugins={plugins} />;
}
