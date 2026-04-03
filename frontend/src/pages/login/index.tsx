import React from 'react';
import LoginForm from '../../features/auth/Login';

const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <LoginForm />
    </div>
  );
};

export default LoginPage;