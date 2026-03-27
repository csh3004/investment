import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials } from '../auth';


export const useLoginForm = () => {

    const [form, setForm] = useState<LoginCredentials>({ email: '', password: '' });

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * [비즈니스 로직] 로그인 버튼을 눌렀을 때 실행되는 함수. (Mocking 로직)
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 버튼 눌렀을 때 페이지가 새로고침되는 것을 막습니다. (중요!)
        setError('');

        // 현업 용어: Happy Path (성공 시나리오) 테스트
        if (form.email === 'a' && form.password === '1') {
            navigate('/');
        } else {
            // 에러 처리: 사용자에게 보여줄 메시지를 저장합니다.
            setError('아이디 또는 비밀번호가 틀렸습니다.');
        }
    };

    // 컴포넌트(화면)에서 꺼내 쓸 수 있도록 데이터와 함수를 내보냅니다.
    return { form, error, handleChange, handleSubmit };
};