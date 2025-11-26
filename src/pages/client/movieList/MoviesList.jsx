import React, { useContext } from 'react';
import { MovieListContext } from '../../../context/MovieListProvider';
import { MoviesContext } from '../../../context/MoviesProvider';
import { useNavigate } from 'react-router-dom';
import { filterById, formatDate, getOjectById } from '../../../services/FunctionRepon';
import { Typography } from '@mui/material';
import { WatchHistoryContext } from '../../../context/WatchHistoryProvider';
import { ContextAuth } from '../../../context/AuthProvider';

function MoviesList() {
    const movieList = useContext(MovieListContext);
    const navigate = useNavigate();
    const movies = useContext(MoviesContext);
    const watchHis = useContext(WatchHistoryContext);
    const { accountLogin } = useContext(ContextAuth);

    return (
        <div className='md:flex  gap-4 p-20 '>
            <div className='flex-1'>
                <Typography variant="h4" className='text-center font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>  Danh sách phim </Typography>
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                    {movieList.map((movie) => (
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
                                src={getOjectById(movies, movie.movieId)?.imgUrl}
                                alt={getOjectById(movies, movie.movieId)?.name}
                                className="w-full h-[280px] object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                                }}
                            />
                            <div className="p-3">
                                <h3 className="text-center text-sm font-semibold text-white line-clamp-2">{getOjectById(movies, movie.movieId)?.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='max-md:mt-5'>
                <Typography variant="h4" className='text-center font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>  Lịch sử xem phim  </Typography>
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4'>
                    {filterById(watchHis,accountLogin?.id,'accountId').sort((a, b) => b.createAt - a.createAt).map((movie) => (
                        <div
                            key={movie.id}
                            onClick={() => {
                                if (movie.id) {
                                    navigate(`/main/movies/detail/${getOjectById(movies, movie.movieId)?.id}`);
                                } else {
                                    console.error('Không tìm thấy id cho phim:', movie.name);
                                }
                            }}
                            className="bg-gray-800 rounded-lg overflow-hidden flex items-center shadow-lg hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                        >
                            <img
                                src={getOjectById(movies, movie.movieId)?.imgUrl}
                                alt={getOjectById(movies, movie.movieId)?.name}
                                className="w-[60px] h-[80px] m-3 rounded-lg"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                                }}
                            />
                            <div className="p-1">
                                <h3 className="text-center text-sm font-semibold text-white line-clamp-2">{getOjectById(movies, movie.movieId)?.name}</h3>
                                <p className='text-sm text-gray-400'>{formatDate(movie.createAt)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default MoviesList;