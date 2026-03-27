const MainHeader = function () {
    return (
        <>
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="font-bold text-sm">임시</span>
                </div>
                <div>
                    <h1 className="text-xl font-bold">임시</h1>
                </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
                <span>KRW</span>
                <span className="w-8 h-6 bg-gray-700 rounded flex items-center justify-center cursor-pointer">T</span>
                <span className="w-20 h-6 bg-gray-700 rounded px-2 flex items-center justify-center cursor-pointer">
                    로그인
                </span>
            </div>
        </>
    );
};

export default MainHeader;