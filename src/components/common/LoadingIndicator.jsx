import React from 'react';
import { CircularProgress } from '@mui/material';

const LoadingIndicator = () => (
    <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] flex items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center gap-4">
            <CircularProgress size={60} sx={{ color: '#fbbf24' }} />
            <p className="text-xl text-yellow-400">Đang tải phim...</p>
        </div>
    </div>
);

export default LoadingIndicator;
