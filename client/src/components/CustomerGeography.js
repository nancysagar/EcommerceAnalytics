import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const CustomerGeography = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://ecommerceanalytics.onrender.com/api/customer-geography');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching geographical data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        label: 'Customer Distribution',
        data: data.map(item => item.customer_count),
        backgroundColor: [
          '#ff6384', // Vibrant pink
          '#36a2eb', // Vibrant blue
          '#ffce56', // Vibrant yellow
          '#4bc0c0', // Vibrant teal
          '#9966ff', // Vibrant purple
        ],
        borderColor: 'rgba(0, 0, 0, 0)', // No border
        borderWidth: 0, // No border width
      }
    ]
  };

  return (
    <div>
      <h2>Customer Geographical Distribution</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Pie data={chartData} options={{ responsive: true }} />
      )}
    </div>
  );
};

export default CustomerGeography;
