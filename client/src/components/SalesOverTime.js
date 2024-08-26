import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const SalesOverTime = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState('monthly');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://ecommerceanalytics.onrender.com/api/sales-over-time?interval=${interval}`);
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
    labels: data.map(item => item._id),
    datasets: [
      {
        label: 'Total Sales',
        data: data.map(item => item.total_sales),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div>
      <h2>Sales Over Time</h2>
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

export default SalesOverTime;
