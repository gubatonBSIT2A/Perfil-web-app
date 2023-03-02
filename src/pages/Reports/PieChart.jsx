import React from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS } from "chart.js/auto";
const options = {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: false,
    },
    title: {
      display: true,
      text: "Positive Cases by Highest Educational Attainment",
    },
    datalabels: {
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
function PieChart({ chartData }) {
  return <Pie data={chartData} options={options} plugins={plugins} />;
}
export default PieChart;
