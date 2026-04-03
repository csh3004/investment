import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials } from '../auth';

export const useLoginForm = () => {
    const [form, setForm] = useState<LoginCredentials>({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.email.trim() || !form.password.trim()) {
            setError('이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // =====================================================================
            // TODO: [백엔드 연동] Spring Boot Auth API 호출
            // 나중에 백엔드가 완성되면 아래 주석을 해제하고 실제 API 코드로 교체하세요.
            // =====================================================================
            /*
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
                email: form.email,
                password: form.password
            });
            
            // Access Token을 받아와서 저장 (보안을 위해 추후 HttpOnly 쿠키 방식도 고려해볼 것)
            const { accessToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            navigate('/');
            return; // 실제 API 호출 시에는 여기서 함수 종료
            */
            // =====================================================================


            // --- 🚨 모의(Mock) 동작 구간 (실제 연동 시 삭제) 🚨 ---
            console.log('서버로 로그인 요청 중... (Mock)');
            await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 지연

            // 테스트용 계정: test@test.com / 1234
            if (form.email === 'test@test.com' && form.password === '1234') {
                // 가짜 JWT 토큰 생성 및 저장
                const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_payload.mock_signature";
                localStorage.setItem('accessToken', mockToken);

                console.log('✅ 모의 로그인 성공: 토큰 발급 및 저장 완료');
                navigate('/'); // 로그인 성공 시 메인 대시보드로 이동
            } else {
                setError('이메일 또는 비밀번호가 일치하지 않습니다.');
            }
            // --------------------------------------------------

        } catch (err) {
            setError('서버와 통신 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    return { form, error, isLoading, handleChange, handleSubmit };
};