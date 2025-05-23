import React, { useState, useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FavoritesContext } from '../../../context/FavoritesProvider';
import { MoviesContext } from '../../../context/MoviesProvider';
import { getOjectById } from '../../../services/FunctionRepon';
import axios from 'axios';

function FavoriteMovie(props) {
    const favoriteMovies = useContext(FavoritesContext);
    const navigate = useNavigate();
    const movies = useContext(MoviesContext);
    const [movieDetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`https://phimapi.com/phim/${favoriteMovies.movieId}`);

                if (response.data && response.data.movie) {
                    setMovieDetails(response.data.movie);
                } else {
                    throw new Error('Dữ liệu phim không hợp lệ');
                }
            } catch (err) {
                console.error('Error fetching movie:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    }, [favoriteMovies]);

    console.log(movieDetails);
    

    return (
        <div className='min-lg:p-20 max-lg:p-10 w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex flex-col gap-6 shadow-xl'>
            <Typography variant="h4" className='text-center font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>  Phim yêu thích </Typography>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                {favoriteMovies.map((movie) => (
                    <div
                        key={movie.id}
                        onClick={() => {
                            if (movie.id) {
                                navigate(`/main/movies/detail/${getOjectById(movies, movie.movieId)?.id}`);
                            } else {
                                console.error('Không tìm thấy id cho phim:', movie.name);
                            }
                        }}
                        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                    >
                        <img
                            src={getOjectById(movies, movie.movieId)?.imgUrl || movieDetails.thumb_url}
                            alt={getOjectById(movies, movie.movieId)?.name || movieDetails.name}
                            className="w-full h-[280px] object-cover"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                            }}
                        />
                        <div className="p-3">
                            <h3 className="text-center text-sm font-semibold text-white line-clamp-2">{getOjectById(movies, movie.movieId)?.name || movie.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoriteMovie;