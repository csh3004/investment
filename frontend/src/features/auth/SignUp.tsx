import React from 'react';

// 임시 로고 컴포넌트 (추후 assets 폴더에 SVG가 추가되면 교체)
const TemporaryLogo = () => (
    <div className="text-xl font-bold text-gray-800 tracking-tighter">
        LOGO
    </div>
);

// 임시 중앙 아이콘 컴포넌트
const TemporaryIcon = () => (
    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-xs">
        IMG
    </div>
);

export const SignUp = () => {
    return (
        <div className="min-h-screen bg-[#fafafa] text-gray-900 flex flex-col font-sans relative">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
                <TemporaryLogo />
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center p-4 mt-12">
                <div className="max-w-sm w-full bg-transparent p-6">
                    <div className="flex flex-col items-center mb-10">
                        <TemporaryIcon />
                    </div>
                    {/* 이메일 입력 폼 */}
                    <form className="space-y-4">
                        <input
                            type="email"
                            placeholder="name@work-email.com"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-white"
                        />
                        <button
                            type="button" // API 연동 전까지는 submit 방지용으로 button 처리
                            className="w-full px-4 py-2.5 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            이메일로 계속 진행
                        </button>
                    </form>

                    {/* Or Separator (여백으로 대체하거나 구분선 사용) */}
                    <div className="h-6"></div>

                    {/* SSO Buttons (정적 UI) */}
                    <div className="space-y-3">
                        {[
                            { name: 'Google', icon: 'G' },
                            { name: 'GitHub', icon: '🐙' },
                            { name: 'Apple', icon: '🍎' },
                            { name: 'SAML SSO', icon: '🔒' }
                        ].map((sso) => (
                            <button
                                key={sso.name}
                                type="button"
                                className="w-full px-4 py-2.5 flex items-center justify-center gap-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors bg-white"
                            >
                                <span className="text-lg">{sso.icon}</span>
                                {sso.name} 에서 계속 진행
                            </button>
                        ))}
                    </div>

                    {/* 하단 링크 */}
                    <div className="mt-8 flex flex-col items-center gap-4 text-sm">
                        <div className="text-gray-500">
                            계정이 없으신가요?{' '}
                            <button className="text-blue-600 hover:underline">
                                회원가입하세요
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="absolute bottom-0 left-0 right-0 p-6 text-center text-xs text-gray-400">
                계속 진행하시면 당사의 서비스 약관 및 개인정보 보호정책 에 따라 계정을 생성하는 데 동의하는 것입니다.
            </footer>
        </div>
    );
};
