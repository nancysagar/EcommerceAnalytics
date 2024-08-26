import React from 'react';
import './App.css'; // Import the CSS file
import SalesGrowthOverTime from './components/SalesGrowthOverTime';
import SalesOverTime from './components/SalesOverTime';
import CLVByCohorts from './components/CLVByCohorts';
import NewCustomersOverTime from './components/NewCustomersOverTime';
import CustomerGeography from './components/CustomerGeography';
import RepeatCustomers from './components/RepeatCustomers';

function App() {
  return (
    <div className="App">
      <h1>Data Visualization Dashboard</h1>
      <div className="chart-container">
        <SalesOverTime />
      </div>
      <div className="chart-container">
        <SalesGrowthOverTime />
      </div>
      <div className="chart-container">
        <NewCustomersOverTime />
      </div>
      <div className="chart-container">
        <RepeatCustomers />
      </div>
      <div className="chart-container">
        <CustomerGeography />
      </div>
      <div className="chart-container">
        <CLVByCohorts />
      </div>
    </div>
  );
}

export default App;
