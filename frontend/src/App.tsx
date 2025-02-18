import React from 'react';
import AppRoutes from './routes/routes';
import { AuthProvider } from './features/auth/authContext';

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes /> {/* Assure-toi que tes routes sont ici */}
    </AuthProvider>
  );
};

export default App;
