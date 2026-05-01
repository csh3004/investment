import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    theme: string;
    toggleTheme: () => void;
}

const MainHeader: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const landleSingupClick = () => {
        navigate('/signUp');
    }

    return (
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
            {/* 로고 영역 */}
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="font-bold text-sm text-white">임시</span>
                </div>
                <div>
                    <h1 className="text-xl font-bold dark:text-white">임시</h1>
                </div>
            </div>

            {/* 우측 메뉴 및 테마 토글 */}
            <div className="flex items-center gap-2 text-sm">
                <span className="dark:text-gray-400">KRW</span>
                <button
                    onClick={toggleTheme}
                    className="w-8 h-6 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    {theme === 'light' ? 'L' : 'D'}
                </button>
                <button onClick={handleLoginClick} className="w-20 h-6 bg-gray-800 dark:bg-gray-100 text-white dark:text-black rounded px-2 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                    로그인
                </button>
                <button onClick={landleSingupClick} className="w-20 h-6 bg-gray-800 dark:bg-gray-100 text-white dark:text-black rounded px-2 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                    회원가입
                </button>
            </div>
        </header>
    );
};

export default MainHeader;