import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Index from '../pages/Home';
import Vehicles from '../pages/Vehicles';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Clients from '../pages/Clients';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from '../components/auth/PrivateRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {}
        <Route
          path="/"
          element={<PrivateRoute element={<Index />} />}
        />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
