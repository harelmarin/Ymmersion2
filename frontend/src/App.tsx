import React from 'react';
import AppRoutes from './routes/routes';
import { AuthProvider } from './features/auth/authContext';

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
