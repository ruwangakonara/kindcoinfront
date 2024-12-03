// ChartBCmp.js
import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, BarController, CategoryScale, LinearScale);

const ChartBCmp = () => {
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
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly Registered Users",
        data: [4, 3, 1, 2, 4, 5, 3],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
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

  return <Bar ref={chartRef} data={data} options={options} />;
};

export default ChartBCmp;
