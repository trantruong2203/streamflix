import React from 'react';
import { useParams } from 'react-router-dom';

import { useMovie } from '../../../hooks/useListMovie';
import FilterBar from '../../../components/client/movie/FilterBar';
import MovieList from '../../../components/client/movie/MovieList';
import Pagination from '../../../components/client/movie/Pagination';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import ErrorDisplay from '../../../components/common/ErrorDisplay';

function ListAnimeMovie() {
    const { typeList } = useParams();
    const {
        movies,
        loading,
        error,
        totalPages,
        listTitle,
        filters,
        handleFilterChange,
        handlePageChange,
        resetFilters,
        initialFilters
    } = useMovie(typeList);

    if (error && (!movies || movies.length === 0)) {
        return (
            <div className="w-full min-h-screen pt-28 px-4 text-center">
                <ErrorDisplay error={error} />
            </div>
        );
    }

    const headingText = listTitle[2] || listTitle[0] || (typeof listTitle === 'string' ? listTitle : 'Danh Sách Phim');

    return (
        <div className="w-full min-h-screen px-3 sm:px-6 md:px-10 pt-24 pb-16 bg-stone-950 text-stone-100">
            <div className="text-center mb-8">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-stone-900 text-amber-400 border border-amber-500/30 mb-2">
                    ARCHIVE REEL • THƯ VIỆN ĐIỆN ẢNH
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-100 tracking-tight">
                    {headingText}
                </h1>
            </div>

            <FilterBar
                filters={filters}
                handleFilterChange={handleFilterChange}
                resetFilters={resetFilters}
                initialFilters={initialFilters}
            />

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="aspect-[2/3] w-full bg-stone-800/60 rounded-md border border-stone-700/40"></div>
                            <div className="h-4 bg-stone-800 rounded w-3/4 mt-2"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <MovieList movies={movies} />
                    <Pagination
                        filters={filters}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}

export default ListAnimeMovie;
