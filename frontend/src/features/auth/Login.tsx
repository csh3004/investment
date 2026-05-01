import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { useLogInForm } from './hooks/useLoginForm';

export const LogIn = () => {
  const { form, error, isLoading, handleChange, handleSubmit } = useLogInForm();

  return (

    <main className="flex-grow flex items-center justify-center p-4 mt-12">
      <div className="max-w-sm w-full bg-transparent p-6">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 font-bold text-xs">
            IMG
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@work-email.com"
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all bg-white dark:bg-gray-800 dark:text-white"
            required
          />
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
  );
};