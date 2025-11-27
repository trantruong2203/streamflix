import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Pagination = ({ filters, totalPages, handlePageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-4 mt-8">
            <button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page === 1}
                className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all"
            >
                <FaArrowLeft />
            </button>

            <span className="text-white px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
                Trang <strong className="text-emerald-400">{filters.page}</strong> / {totalPages}
            </span>

            <button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page === totalPages}
                className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all"
            >
                <FaArrowRight />
            </button>
        </div>
    );
};

export default Pagination;
