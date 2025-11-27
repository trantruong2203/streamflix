import React from 'react';

function CardMovie({ movie, navigate }) {
    return (
        <div>
            <div
                key={movie._id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:-translate-y-1 transition-transform duration-300 cursor-pointer group"
                onClick={() => navigate(`/movie/${movie.slug}`)}
            >
                <div className="relative overflow-hidden">
                    <img
                        src={movie.thumb_url.includes('http') ? movie.thumb_url : `https://phimimg.com/${movie.thumb_url}`}
                        alt={movie.name}
                        className="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'; }}
                    />
                    <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-bl-lg">
                        {movie.year}
                    </div>
                </div>
                <div className="p-3">
                    <h3 className="text-center text-sm font-semibold text-white line-clamp-2 group-hover:text-yellow-400 transition-colors">
                        {movie.name}
                    </h3>
                    <p className="text-center text-xs text-gray-400 mt-1">{movie.origin_name}</p>
                </div>
            </div>
        </div>
    );
}

export default CardMovie;