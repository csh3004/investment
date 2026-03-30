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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (form.email === 'a' && form.password === '1') {
            navigate('/');
        } else {
            setError('아이디 또는 비밀번호가 틀렸습니다.');
        }
    };

    return { form, error, handleChange, handleSubmit };
};