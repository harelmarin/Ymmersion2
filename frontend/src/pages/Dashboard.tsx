import React from 'react';
import { fetchStatisticsByMonth } from '../services/statisticService';

const Dashboard = () => {
  const { data, isLoading, error } = fetchStatisticsByMonth(new Date().getMonth() + 1, new Date().getFullYear())
  console.log(data)
  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
}

export default Dashboard;