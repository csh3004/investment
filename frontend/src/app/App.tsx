import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/login/LogIn'; // 상대 경로로 우선 작성 (에러 방지)
import MainPage from '../pages/main';
import Transaction from '../pages/transaction';
import MainLayout from '../components/layout/MainLayout';

// 추후 만들 페이지들 (예시)
// import MainPage from './pages/Main';
// import SignupPage from './pages/Signup';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    {/* 기본 경로: 메인 화면 (나중에 구현 시 연결) */}
                    <Route path="/" element={<MainPage />} />

                {/* 로그인 페이지 */}
                <Route path="/trade" element={<Transaction />} />

                {/* 로그인 페이지 */}
                <Route path="/login" element={<LoginPage />} />

                    {/* 회원가입 페이지 (나중에 구현) */}
                    <Route path="/signup" element={<div>회원가입 페이지 (준비 중)</div>} />

                    {/* 잘못된 경로로 들어오면 메인으로 리다이렉트 */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
};

export default App;