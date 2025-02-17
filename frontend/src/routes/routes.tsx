import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Index from '../pages/Home';
import Vehicles from '../pages/Vehicles';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/vehicles" element={<Vehicles />} />
      </Routes>
    </Router>
  );
};
export default AppRoutes;
