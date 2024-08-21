import React from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PatrimoineChart = ({ chartData }) => {
  const data = {
    labels: chartData.map((e) => e.date),
    datasets: [
      {
        label: "Valeur Patrimoine",
        data: chartData.map((e) => e.value),
        borderColor: "rgb(0, 71, 99)",
        backgroundColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Evolution valeur patrimoine entre ${
          data.labels[0]
        } et ${data.labels.at(-1)}`,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PatrimoineChart;
