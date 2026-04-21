import React from 'react';
import { LogIn } from '../../features/auth/Login';
import MainLayout from '../../components/layout/MainLayout';


const LogInPage: React.FC = () => {
  return (
    <MainLayout>
      <LogIn />
    </MainLayout>
  );
};

export default LogInPage;