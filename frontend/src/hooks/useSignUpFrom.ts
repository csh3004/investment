import { useState } from 'react';

export const useSignUpFrom = () => {
    // 1. 상태 관리: 사용자가 입력하는 값들을 모아두는 바구니
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');  // 에러 메시지
    const [isLoading, setIsLoading] = useState(false);  // 로딩 상태 (버튼 연타 방지용)

    // 2. 입력 핸들러: 사용자가 타자를 칠 때마다 바구니(form) 값을 업데이트
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setError('');  // 새로 입력하기 시작하면 기존 에러 메시지는 지워줍니다.
    };

    // 3. 제출 핸들러: '회원가입' 버튼을 눌렀을 때 실행되는 함수
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();  // 새로고침 방지 (React 폼의 기본 툴)

        // 프론트엔드 1차 검증: 비밀번호가 서로 같은지 확인
        if (form.password !== form.confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            //방금 포스트낸으로 테스터했던 그 주소로 실제 데이터를 씁니다
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                    name: form.name
                }),
            });

            if (!response.ok) {
                // 백엔드에서 400번대(실패) 에러를 보냈을 때
                throw new Error('회원가입에 실패했습니다. (이미 존재하는 이메일일 수 있습니다.)');
            }

            // 백엔드가 "회원가입 성공!"이라는 텍스트를 보냈으므로 text()로 받습니다.
            const data = await response.text();
            alert(data);

            //
        } catch (err: any) {
            console.error("통신 에러:", err);
            setError(err.message || '서버와 통신 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);  // 성공하든 실패하든 로
        }
    };

    return { form, error, isLoading, handleChange, handleSubmit };
};