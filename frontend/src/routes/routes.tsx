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
import Profile from '../pages/Profile';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/index" element={<PrivateRoute element={<Index />} />} />
        <Route
          path="/vehicles"
          element={<PrivateRoute element={<Vehicles />} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/clients"
          element={<PrivateRoute element={<Clients />} />}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
