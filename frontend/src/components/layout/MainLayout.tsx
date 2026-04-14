import React, { useEffect, useState } from 'react';
import MainHeader from '../Header'; // 파일명은 Header.tsx 이지만 export name은 MainHeader

interface LayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'light') {
            root.classList.remove('dark');
        } else {
            root.classList.add('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col font-sans relative transition-colors duration-300">
            {/* MainHeader 사용 */}
            <MainHeader theme={theme} toggleTheme={toggleTheme} />
            {children}
        </div>
    );
};

export default MainLayout;