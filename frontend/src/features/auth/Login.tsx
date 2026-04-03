import React from 'react';
import { Link } from 'react-router-dom'; // ✨ 회원가입 페이지 이동을 위해 추가

// 임시 로고 컴포넌트
const TemporaryLogo = () => (
  <div className="text-xl font-bold text-gray-800 tracking-tighter">
    LOGO
  </div>
);

// 임시 중앙 아이콘 컴포넌트
const TemporaryIcon = () => (
  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-xs">
    IMG
  </div>
);

export const LogIn = () => {
  const isBlack = true;
  localStorage.setItem("isBlack", isBlack.toString());
  //const isBlack = localStorage.getItem("isBlack");
  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 flex flex-col font-sans relative">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <TemporaryLogo />
      </header>

      {/* Main Content */}
      <main className={`flex-grow flex items-center justify-center p-4 mt-12 ${isBlack ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="max-w-sm w-full bg-transparent p-6">
          <div className="flex flex-col items-center mb-10">
            <TemporaryIcon />
          </div>

          {/* ✨ 클린 코드: 이메일과 비밀번호를 하나의 form 태그로 통합했습니다. */}
          <form className="flex flex-col gap-5">

            {/* 이메일 입력 영역 */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="emailInput" className="text-sm font-bold">
                이메일
              </label>
              <input
                id="emailInput"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
              />
            </div>

            {/* 비밀번호 입력 영역 */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="passwordInput" className="text-sm font-bold">
                비밀번호
              </label>
              <input
                id="passwordInput"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
              />
            </div>

            {/* 로그인 유지 + 찾기 */}
            <div className="flex justify-between items-center mt-1 mb-1">
              <label className="flex items-center gap-1.5 text-sm text-gray-500 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5" />
                로그인 유지
              </label>
              <button type="button" className="text-sm text-gray-500 hover:text-gray-700">
                아이디·비밀번호 찾기
              </button>
            </div>

            {/* 로그인 버튼: form 안에서 엔터키가 작동하도록 type="submit"으로 변경 */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gray-900 text-white text-base font-medium rounded-md hover:bg-black transition-colors tracking-wide"
            >
              로그인
            </button>
          </form>

          {/* 또는 구분선 */}
          <div className="flex items-center gap-3 my-6">
            <hr className="flex-1 border-gray-200" />
            <span className="text-sm text-gray-400">또는</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* SSO Buttons */}
          <div className="flex justify-center gap-4">
            {/* 카카오 */}
            <button type="button" className="w-12 h-12 rounded-full bg-[#FEE500] flex items-center justify-center hover:opacity-90 transition-opacity">
              <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
                <path d="M24 10C15.163 10 8 15.82 8 23c0 4.418 2.814 8.313 7.104 10.698L13.5 38l5.63-3.02C20.886 35.31 22.42 35.5 24 35.5c8.837 0 16-5.82 16-13S32.837 10 24 10z" fill="#3C1E1E" />
                <circle cx="17" cy="23" r="2" fill="#FEE500" />
                <circle cx="24" cy="23" r="2" fill="#FEE500" />
                <circle cx="31" cy="23" r="2" fill="#FEE500" />
              </svg>
            </button>

            {/* 네이버 */}
            <button type="button" className="w-12 h-12 rounded-full bg-[#03C75A] flex items-center justify-center hover:opacity-90 transition-opacity">
              <span className="text-white text-base font-bold">N</span>
            </button>

            {/* 페이스북 */}
            <button type="button" className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-90 transition-opacity">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>

            {/* 구글 */}
            <button type="button" className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </button>
          </div>

          {/* 하단 링크 */}
          <div className="mt-10 flex flex-col items-center gap-4 text-sm">
            <div className="text-gray-500">
              아직 회원이 아니신가요?{' '}
              <Link to="/signup" className="text-blue-600 font-medium hover:underline">
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-6 text-center text-xs text-gray-400">
        계속 진행하시면 당사의 서비스 약관 및 개인정보 보호정책 에 따라 계정을 생성하는 데 동의하는 것입니다.
      </footer>
    </div>
  );
};