import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ filters, totalPages, handlePageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-3 mt-10 pb-6">
            <button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page === 1}
                className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 text-amber-400 hover:bg-amber-500 hover:text-stone-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center cursor-pointer shadow-md"
            >
                <FaChevronLeft className="text-xs" />
            </button>

            <span className="text-stone-300 px-4 py-2 bg-stone-900/90 rounded-md border border-stone-800 font-mono text-xs tracking-wider">
                Trang <strong className="text-amber-400 font-bold">{filters.page}</strong> / {totalPages}
            </span>

            <button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page === totalPages}
                className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 text-amber-400 hover:bg-amber-500 hover:text-stone-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center cursor-pointer shadow-md"
            >
                <FaChevronRight className="text-xs" />
            </button>
        </div>
    );
};

export default Pagination;
