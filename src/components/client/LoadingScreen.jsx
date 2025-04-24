import React from 'react';

function LoadingScreen() {
    return (
        <div className="fixed inset-0 flex flex-col h-[100vh] items-center justify-center bg-black">
            <div className="relative w-20 h-20">
                <img 
                    src="\src\assets\loading.gif" 
                    alt="Loading" 
                    className="w-full h-full object-contain"
                />
            </div>
            <p className="mt-4 text-lg font-medium text-white">
                Đang tải...
            </p>
        </div>
    );
}

export default LoadingScreen;