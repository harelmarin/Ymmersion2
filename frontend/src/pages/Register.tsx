import React from 'react';
import RegisterForm from '../components/form/RegisterForm';
import Navbar from '../components/common/Navbar';
const Register = () => {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen p-5 bg-gray-100">
        <div className="w-[75%] max-w-md mx-auto mt-20">
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-8">
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">
              Créer un compte
            </h1>
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
