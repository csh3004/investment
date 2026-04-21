import React from 'react';
import MainForm from '../../features/main/Main';
import MainLayout from '../../components/layout/MainLayout'; // Layout 경로 확인

const MainPage: React.FC = () => {
  return (
    <MainLayout>
      <MainForm />
    </MainLayout>
  );
};

export default MainPage;