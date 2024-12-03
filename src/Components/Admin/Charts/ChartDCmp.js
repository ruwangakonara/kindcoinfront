import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the chart.js components
ChartJS.register(BarElement, BarController, CategoryScale, LinearScale);

const ChartDCmp = ({ donationData }) => {
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

  // Filter out the goods and monetary donations
  const goodsDonations = donationData.filter(
    (donation) => donation.type === "goods"
  );
  const monetaryDonations = donationData.filter(
    (donation) => donation.type === "monetary"
  );

  // Function to get donation counts by month
  const getMonthlyDonationCounts = (donations) => {
    const monthCounts = Array(12).fill(0); // Array to hold count for each month (0 = January, 11 = December)

    donations.forEach((donation) => {
      const month = new Date(donation.created).getMonth(); // Get the month (0 = January)
      monthCounts[month] += 1; // Increment the count for that month
    });

    return monthCounts;
  };

  // Get the donation counts for goods and monetary donations by month
  const goodsMonthlyCounts = getMonthlyDonationCounts(goodsDonations);
  const monetaryMonthlyCounts = getMonthlyDonationCounts(monetaryDonations);

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Goods Donations",
        data: goodsMonthlyCounts,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
      {
        label: "Monetary Donations",
        data: monetaryMonthlyCounts,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
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

export default ChartDCmp;
