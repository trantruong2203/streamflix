import React, { useState, useContext } from 'react';
import { Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { MoviesContext } from '../../../context/MoviesProvider';
function FavoriteMovie(props) {
    const movies = useContext(MoviesContext);
    const navigate = useNavigate();


    return (
        <div className='pt-10 px-10 pb-10 mt-25 mb-10 mx-10 w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex flex-col gap-6 shadow-xl'>
            <Typography variant="h4" className='text-center font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>  Phim yêu thích </Typography>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        onClick={() => {
                            if (movie.id) {
                                navigate(`/main/movies/detail/${movie.id}`);
                            } else {
                                console.error('Không tìm thấy slug cho phim:', movie.name);
                            }
                        }}
                        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                    >
                        <img
                            src={movie.imgUrl}
                            alt={movie.name}
                            className="w-full h-[280px] object-cover"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                            }}
                        />
                        <div className="p-3">
                            <h3 className="text-center text-sm font-semibold text-white line-clamp-2">{movie.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoriteMovie;