import React from 'react';
import { useParams } from 'react-router-dom';

import { useMovie } from '../../../hooks/useMovie';
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

    if (error) {
        return <ErrorDisplay error={error} />;
    }

    return (
        <div className="p-5 max-w-7xl mx-auto py-20">
            <h1 className="text-3xl font-bold text-center text-emerald-50 mb-8">{listTitle[2]}</h1>

            <FilterBar
                filters={filters}
                handleFilterChange={handleFilterChange}
                resetFilters={resetFilters}
                initialFilters={initialFilters}
            />

            {loading ? (
                <LoadingIndicator />
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