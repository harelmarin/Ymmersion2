import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Index from '../pages/Home';
import Vehicles from '../pages/Vehicles';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Clients from '../pages/Clients';
import Dashboard from '../pages/Dashboard';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};
export default AppRoutes;
