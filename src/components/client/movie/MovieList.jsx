import React from 'react';
import CardMovie from './cardMovie';
import { useNavigate } from 'react-router-dom';

const MovieList = ({ movies }) => {
    const navigate = useNavigate();

    if (movies.length === 0) {
        return (
            <div className="col-span-full text-center text-gray-400 py-10">
                Không tìm thấy phim nào phù hợp với bộ lọc.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {movies.map((movie) => (
                <CardMovie movie={movie} key={movie._id} navigate={navigate} />
            ))}
        </div>
    );
};

export default MovieList;
