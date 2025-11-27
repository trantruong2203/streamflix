import React from 'react';

const ErrorDisplay = ({ error }) => {
    if (!error) return null;

    return (
        <div className="flex flex-col items-center justify-center p-10 bg-red-50 rounded-lg m-5">
            <h2 className="text-red-500 text-xl font-bold mb-2">Lỗi</h2>
            <p className="text-gray-600 mb-5">{error}</p>
            <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
                Thử lại
            </button>
        </div>
    );
};

export default ErrorDisplay;
