import React from 'react';
<<<<<<< HEAD
import LoginForm from '../../features/auth/Login';

const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <LoginForm />
=======
import { Login } from '../../features/auth/Login';

const LoginPage: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Login />
>>>>>>> parent of a709fb6 (feat: 회원가입 페이지 이동 추가)
    </div>
  );
};

export default LoginPage;