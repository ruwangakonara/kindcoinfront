// ChartCCmp.js
import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  PieController,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, PieController, Tooltip, Legend);

const ChartCCmp = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.update({
        duration: 800,
        easing: "easeInOutQuad",
      });
    }
  }, []);

  const data = {
    labels: ["Donors", "Beneficiaries", "Members", "Admin"],
    datasets: [
      {
        label: "User Distribution",
        data: [6, 6, 6, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(125, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(125, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 1000,
    },
  };

  return <Pie ref={chartRef} data={data} options={options} />;
};

export default ChartCCmp;
