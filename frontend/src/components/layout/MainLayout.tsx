import React from 'react';

interface LayoutProps {
    children: React.ReactNode;  // 각 페이지의 알맹이가 들어옴.
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        /**
         * min-h-screen: 최소 화면 높이
         * bg-white drak:bg-[#121212]: 흰색 배경 (기본), 다크모드일 때 #121212 배경
         * text-gray-900 dark:text-white: 회색 900 텍스트 (기본), 다크모드일 때 흰색 텍스트
         * transition-colors duration-300: 색상 전환 효과 (300ms)
         */
        <div className="min-h-screen bg-white drak:bg-[#121212] text-gray-900 dark:text-white transition-colors duration-300">
            <main className="flex items-center justify-center p-4">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;