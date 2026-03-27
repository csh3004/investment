import React from 'react';
import LoginForm from '../../features/auth/Login';

const LoginPage: React.FC = () => {
  return (
    // 페이지 수준의 레이아웃 설정 (배경색, 중앙 정렬 등)
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default LoginPage;