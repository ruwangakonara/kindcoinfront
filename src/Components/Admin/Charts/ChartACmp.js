// ChartACmp.js
import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, LineElement, PointElement, LineController, CategoryScale, LinearScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LineController, CategoryScale, LinearScale);

const ChartACmp = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
            chart.update({
                duration: 800,
                easing: 'easeInOutQuad',
            });
        }
    }, []);

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Token Distribution',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        animation: {
            duration: 1000,
        },
    };

    return <Line ref={chartRef} data={data} options={options} />;
};

export default ChartACmp;
