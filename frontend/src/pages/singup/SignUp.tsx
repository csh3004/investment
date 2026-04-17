import React from 'react';
import { SignUp } from "../../features/auth/SignUp";
import MainLayout from '../../components/layout/MainLayout';

const SignUpPage: React.FC = () => {
    return (
        <MainLayout>
            <SignUp />
        </MainLayout>
    );
};

export default SignUpPage;