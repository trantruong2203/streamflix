import React from 'react';
import { FILTER_OPTIONS } from '../../../utils/Contants';

const FilterBar = ({ filters, handleFilterChange, resetFilters }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8 bg-gray-800 p-4 rounded-xl shadow-lg">
        <select
            name="sort_field"
            value={filters.sort_field}
            onChange={handleFilterChange}
            className="bg-gray-700 text-white p-2 rounded outline-none border border-gray-600 focus:border-emerald-500"
        >
            {FILTER_OPTIONS.sort_field.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        <select
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            className="bg-gray-700 text-white p-2 rounded outline-none border border-gray-600 focus:border-emerald-500"
        >
            {FILTER_OPTIONS.countries.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="bg-gray-700 text-white p-2 rounded outline-none border border-gray-600 focus:border-emerald-500"
        >
            {FILTER_OPTIONS.years.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        <select
            name="sort_type"
            value={filters.sort_type}
            onChange={handleFilterChange}
            className="bg-gray-700 text-white p-2 rounded outline-none border border-gray-600 focus:border-emerald-500"
        >
            {FILTER_OPTIONS.sort_type.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        <button
            onClick={resetFilters}
            className="bg-red-500 hover:bg-red-600 text-white rounded font-bold transition-colors"
        >
            Reset
        </button>
    </div>
);

export default FilterBar;
