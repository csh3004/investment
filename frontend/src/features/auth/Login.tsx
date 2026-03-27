import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API 호출 로직 (services 폴더 함수 사용 권장)
    } catch (err: any) {
      setError(err.message || '로그인 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">모의투자 로그인</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">이메일</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">비밀번호</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* 써드파티 로그인 버튼이 들어갈 자리 */}
      <div className="flex flex-col gap-2 mb-4">
        {/* <SocialLoginButtons /> 등을 여기에 배치 */}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? '로그인 중...' : '로그인'}
      </button>

      <p className="mt-4 text-center text-sm">
        회원가입은 <a href="/register" className="text-blue-500">여기</a>
      </p>
    </form>
  );
};

export default LoginForm;