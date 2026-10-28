import React from 'react';
import CardMovie from './cardMovie';

const MovieList = ({ movies }) => {
    if (!movies || movies.length === 0) {
        return (
            <div className="col-span-full text-center text-stone-400 py-16 bg-stone-900/50 rounded-xl border border-stone-800 my-6">
                <p className="text-sm font-mono">Không tìm thấy phim nào phù hợp với bộ lọc đã chọn.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 mb-8">
            {movies.map((movie) => (
                <CardMovie movie={movie} key={movie._id || movie.slug} />
            ))}
        </div>
    );
};

export default MovieList;
