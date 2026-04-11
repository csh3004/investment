import React from 'react';
import { useLoginForm } from './hooks/useLoginForm'; // 우리가 만든 로직 연결

// ... TemporaryLogo, TemporaryIcon 컴포넌트는 그대로 유지

export const Login = () => {
  const { form, error, isLoading, handleChange, handleSubmit } = useLoginForm();

  return (
    /* 1. 전체 배경: bg-[#fafafa]에 dark:bg-gray-900 추가 */
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col font-sans relative transition-colors duration-300">

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <div className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tighter">
          LOGO
        </div>
        <button className="py-1.5 px-4 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          회원가입
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 mt-12">
        <div className="max-w-sm w-full bg-transparent p-6">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 font-bold text-xs">
              IMG
            </div>
          </div>

          {/* 이메일 입력 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@work-email.com"
              /* 2. 입력창: dark:bg-gray-800, dark:border-gray-700 등 추가 */
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all bg-white dark:bg-gray-800 dark:text-white"
              required
            />
            {/* 비밀번호 입력창도 추가해야 로직과 연결됩니다. */}
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all bg-white dark:bg-gray-800 dark:text-white"
              required
            />

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              /* 3. 버튼: 다크 모드에서는 검정색 배경 대신 흰색 배경에 검정 글씨가 세련돼 보입니다. */
              className="w-full px-4 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {isLoading ? '진행 중...' : '계속 진행'}
            </button>
          </form>

          {/* SSO Buttons */}
          <div className="space-y-3 mt-6">
            {[
              { name: 'Google', icon: 'G' },
              { name: 'GitHub', icon: '🐙' },
              { name: 'Apple', icon: '🍎' }
            ].map((sso) => (
              <button
                key={sso.name}
                type="button"
                className="w-full px-4 py-2.5 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-gray-800"
              >
                <span className="text-lg">{sso.icon}</span>
                {sso.name} 에서 계속 진행
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};