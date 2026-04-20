import { useState } from 'react';

interface SignUpForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const useSignUpForm = () => {
    const [form, setForm] = useState<SignUpForm>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // 비밀번호 일치 검사
        if (form.password !== form.confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        setIsLoading(true);
        try {
            // TODO: 실제 회원가입 API 호출
            console.log('회원가입 데이터:', form);
        } catch (err) {
            setError('회원가입 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return { form, error, isLoading, handleChange, handleSubmit };
};