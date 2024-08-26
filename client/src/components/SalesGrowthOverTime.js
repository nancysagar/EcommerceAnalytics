import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const SalesGrowthOverTime = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState('monthly');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://ecommerceanalytics.onrender.com/api/sales-growth-rate?interval=${interval}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [interval]);

  const chartData = {
    labels: data.map(item => item.period),
    datasets: [
      {
        label: 'Sales Growth Rate (%)',
        data: data.map(item => item.growth_rate),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div>
      <h2>Sales Growth Rate Over Time</h2>
      <select value={interval} onChange={e => setInterval(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="yearly">Yearly</option>
      </select>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Line data={chartData} options={{ responsive: true }} />
      )}
    </div>
  );
};

export default SalesGrowthOverTime;
