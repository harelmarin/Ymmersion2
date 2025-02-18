import React from 'react';
import LoginForm from '../components/form/LoginForm';

const Login = () => {
  return (
    <div className="w-full min-h-screen p-5 bg-gray-100">
      <div className="w-[75%] max-w-md mx-auto mt-20">
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-8">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">
            Se connecter
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
