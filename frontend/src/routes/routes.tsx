import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Index from '../pages/Home';
import Vehicles from '../pages/Vehicles';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Clients from '../pages/Clients';
import PrivateRoute from '../components/auth/PrivateRoute';
import Profile from '../pages/Profile';
import TransactionHistory from '../pages/TransactionHistory';
import VehicleDetails from '../pages/VehicleDetails';
import Transaction from '../pages/Transaction';
import AllTransactions from '../pages/AllTransactions';
import TransactionDetails from '../pages/TransactionDetails';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Index />} />} />
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
          path="/transaction/user/:id"
          element={<PrivateRoute element={<TransactionHistory />} />}
        />
        <Route
          path="/transaction/new/:vehicleId"
          element={<PrivateRoute element={<Transaction />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route
          path="/vehicles/:id"
          element={<PrivateRoute element={<VehicleDetails />} />}
        />
        <Route
          path="/transactions"
          element={<PrivateRoute element={<AllTransactions />} />}
        />
        <Route
          path="/transaction/:id/details"
          element={<PrivateRoute element={<TransactionDetails />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
