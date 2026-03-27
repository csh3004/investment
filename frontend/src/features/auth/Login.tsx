import React from 'react';
import { useLoginForm } from './hooks/useLoginForm';

const LoginForm: React.FC = () => {
  const { form, error, handleChange, handleSubmit } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font:bold mb-6 text-center">모의투자 로그인</h2>

      <div className="mb-4">
        <label className="block mb-1">이메일</label>
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">비밀번호</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;