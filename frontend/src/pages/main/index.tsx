import React from 'react';
import MainForm from '../../features/main/Main';

const MainPage: React.FC = () => {
  return (
    // 페이지 수준의 레이아웃 설정 (배경색, 중앙 정렬 등)
    <div className="min-h-screen w-screen bg-gray-900 p-0">
      <MainForm />
    </div>
  );
};

export default MainPage;