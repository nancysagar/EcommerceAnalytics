import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const RepeatCustomers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState('monthly');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://ecommerceanalytics.onrender.com/api/repeat-customers?interval=${interval}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching repeat customers data:', error);
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
        label: 'Repeat Customers',
        data: data.map(item => item.repeat_customers),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div>
      <h2>Repeat Customers</h2>
      <select value={interval} onChange={e => setInterval(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="yearly">Yearly</option>
      </select>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Bar data={chartData} options={{ responsive: true }} />
      )}
    </div>
  );
};

export default RepeatCustomers;
