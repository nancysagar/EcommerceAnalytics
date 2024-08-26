import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const CLVByCohorts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://ecommerceanalytics.onrender.com/api/clv-by-cohorts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching CLV by cohorts data:', error);
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
        label: 'Customer Lifetime Value',
        data: data.map(item => item.average_clv),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div>
      <h2>Customer Lifetime Value by Cohorts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Line data={chartData} options={{ responsive: true }} />
      )}
    </div>
  );
};

export default CLVByCohorts;
