import React from "react";
import { Bar } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
// import { Chart as ChartJS } from "chart.js/auto";
import { Chart, registerables } from "chart.js";
import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";
Chart.register(...registerables, ChartjsPluginStacked100);
const marimekkoDataLabels = {
  id: "marimekkoDataLabels",
  afterDatasetsDraw(chart, args, pluginOptions) {
    const {
      ctx,
      data,
      chartArea: { top, bottom },
      scales: { x, y },
    } = chart;
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.fillText("text", x, y);
    // console.log(chart.getDatasetMeta(0));
    data.datasets.forEach((dataset, index) => {
      for (let i = 0; i < dataset.data.length; i++) {
        ctx.fillText(
          dataset.data[i] === 0 ? "" : dataset.data[i],
          chart.getDatasetMeta(index).data[i].x,
          chart.getDatasetMeta(index).data[i].y + 12
        );
      }
    });
  },
};

const topLabels = {
  id: 'topLabels',
  afterDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, scales: { x } } = chart;
    chart.data.datasets[0].data.forEach(
      (datapoint, index) => {
        const datasetArray = [];
        chart.data.datasets.forEach(
          (dataset) => {
            datasetArray.push(dataset.data[index]);


          })
        //sum array
        function totalSum(total, values) {
          return total + values;
        }
        let sum = datasetArray.reduce(totalSum, 0);
        ctx.font = '12px sans-serif';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        const datasetMeta = chart.getDatasetMeta(1);
        if (datasetMeta && datasetMeta.data && datasetMeta.data.length) {
          ctx.fillText(sum, x.getPixelForValue(index), datasetMeta.data[index].y - 10);
        }
      })

  }
}

const topScaleTitle = {
  id: 'topScaleTitle',
  afterDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#666';
    ctx.fillText('Total number of tested patients',left + width / 2, top - 30);

  }
}
const legendMargin = {
  id: 'legendMargin',
  beforeInit(chart, legend, options) {
    const fitValue = chart.legend.fit;
    chart.legend.fit = function fit() {
      fitValue.bind(chart.legend)();
      return this.height += 50;
    }
  }
}
const options = {
  borderSkipped: false,
  barPercentage: 1,
  categoryPercentage: 0.9,
  scales: {
    x: {
      grid: {
        display: false,
      },
      title: {
        display: true,
        text: "Date",
      },
    },
    y: {
      title: {
        display: true,
        text: "Percentage",
      },
      beginAtZero: true,
      grace: 4,
      ticks: {
        callback: function (value) {
          return value + "%";
        },
      },
    },
    // topLabel: {
    //   labels: {
    //     display: false 

    //   },
    //   title: {
    //     display: true,
    //     text: "total number tested patients",
    //   },
    //   beginAtZero: true,
    //   position: "top"
    // }
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Positive cases",
    },
    stacked100: {
      enable: true,
    },
    tooltip: {
    },
  },
};
const plugins = [marimekkoDataLabels, topLabels, legendMargin, topScaleTitle];
export default function MultiBarChart({ chartData }) {
  return <Bar data={chartData} options={options} plugins={plugins} />;
}
