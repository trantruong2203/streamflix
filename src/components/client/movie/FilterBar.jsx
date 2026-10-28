import React from 'react';
import { FILTER_OPTIONS } from '../../../utils/Contants';

const FilterBar = ({ filters, handleFilterChange, resetFilters }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8 bg-stone-900/90 border border-stone-800 p-4 rounded-xl shadow-xl backdrop-blur-sm">
        <select
            name="sort_field"
            value={filters.sort_field}
            onChange={handleFilterChange}
            className="bg-stone-950 text-stone-200 p-2.5 rounded-md outline-none border border-stone-800 focus:border-amber-500 font-mono text-xs cursor-pointer transition-colors"
        >
            {FILTER_OPTIONS.sort_field.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        <select
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            className="bg-stone-950 text-stone-200 p-2.5 rounded-md outline-none border border-stone-800 focus:border-amber-500 font-mono text-xs cursor-pointer transition-colors"
        >
            {FILTER_OPTIONS.countries.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="bg-stone-950 text-stone-200 p-2.5 rounded-md outline-none border border-stone-800 focus:border-amber-500 font-mono text-xs cursor-pointer transition-colors"
        >
            {FILTER_OPTIONS.years.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        <select
            name="sort_type"
            value={filters.sort_type}
            onChange={handleFilterChange}
            className="bg-stone-950 text-stone-200 p-2.5 rounded-md outline-none border border-stone-800 focus:border-amber-500 font-mono text-xs cursor-pointer transition-colors"
        >
            {FILTER_OPTIONS.sort_type.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        <button
            onClick={resetFilters}
            className="bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 border border-stone-700/80 hover:border-amber-400 font-mono text-xs uppercase tracking-wider font-semibold rounded-md transition-all py-2.5 cursor-pointer shadow-sm"
        >
            Đặt lại bộ lọc
        </button>
    </div>
);

export default FilterBar;
