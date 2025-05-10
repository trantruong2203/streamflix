import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { checkFavoriteMovie, checkMovieList, getFavoriteMovie, moviesList } from '../../../services/FunctionRepon';
import { Rating, Typography } from '@mui/material';
import { ContextAuth } from '../../../context/AuthProvider';
import { FavoritesContext } from '../../../context/FavoritesProvider';
import { MovieListContext } from '../../../context/MovieListProvider';
import { useNotification } from '../../../context/NotificationProvide';
import { FaHeart, FaPlus, FaClock, FaCalendarAlt, FaTags, FaFilm, FaPlay } from 'react-icons/fa';
import Comment from '../../../components/client/Comment/Comment';

function PlayMovie() {
    const { slug } = useParams();
    const [movies, setMovies] = useState(null);
    const [selectedServer, setSelectedServer] = useState(0);
    const [selectedEpisode, setSelectedEpisode] = useState(0);
    const { accountLogin } = useContext(ContextAuth);
    const favorites = useContext(FavoritesContext);
    const list = useContext(MovieListContext);
    const notification = useNotification();

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await axios.get(`https://phimapi.com/phim/${slug}`);
                setMovies(response.data);
                setSelectedEpisode(0);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu phim:", error);
            }
        };

        fetchMovieData();
    }, [slug]);

    if (!movies) {
        return <div className="flex items-center justify-center min-h-screen text-white text-lg">Đang tải...</div>;
    }

    if (!movies.episodes || movies.episodes.length === 0) {
        return <div className="flex items-center justify-center min-h-screen text-white text-lg">Không có tập phim nào</div>;
    }

    const handleServerChange = (e) => {
        setSelectedServer(parseInt(e.target.value));
        setSelectedEpisode(0);
    };

    const handleEpisodeChange = (e) => {
        setSelectedEpisode(parseInt(e.target.value));
        smoothScrollToTop(1000);
    };

    function smoothScrollToTop(duration = 500) {
        const start = window.scrollY;
        const startTime = performance.now();

        function scroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // easing function (easeOutCubic)
            window.scrollTo(0, start * (1 - ease));
            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        }

        requestAnimationFrame(scroll);
    }

    const currentServer = movies.episodes[selectedServer];
    const currentEpisode = currentServer?.server_data[selectedEpisode];

    if (!currentServer || !currentEpisode) {
        return <div className="flex items-center justify-center min-h-screen text-white text-lg">Không tìm thấy tập phim</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen text-white">
            <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl">
                <iframe
                    src={currentEpisode.link_embed}
                    title="Video Player"
                    className="w-full h-[80vh]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                ></iframe>
            </div>

            {/* Control Buttons */}
            <div className='flex justify-between'>
                <div className="flex items-center justify-center gap-8 mt-6 mb-8">
                    <button
                        onClick={() => getFavoriteMovie(accountLogin, movies, favorites, notification)}
                        className='flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105'
                    >
                        {checkFavoriteMovie(accountLogin, movies, favorites) ? (
                            <>
                                <FaHeart className="text-xl text-red-600" />
                                <span>Bỏ Yêu thích</span>
                            </>
                        ) : (
                            <>
                                <FaHeart className="text-xl" />
                                <span>Yêu thích</span>
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => moviesList(accountLogin, movies, list, notification)}
                        className='flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105'
                    >
                        {checkMovieList(accountLogin, movies, list) ? (
                            <>
                                <FaPlus className="text-xl text-yellow-400" />
                                <span>Bỏ Thêm vào</span>
                            </>
                        ) : (
                            <>
                                <FaPlus className="text-xl" />
                                <span>Thêm vào</span>
                            </>
                        )}
                    </button>


                </div>

                <div>
                    <div className='mt-6 mb-8'>
                        <Typography component="legend" className='text-white'>Đánh giá</Typography>
                        <Rating
                            name="customized-10"
                            defaultValue={0}
                            max={10}
                            value={movies.movie.tmdb.vote_average}
                            readOnly
                            sx={{
                                '& .MuiRating-iconFilled': {
                                    color: '#fbbf24',
                                },
                                '& .MuiRating-iconHover': {
                                    color: '#f59e0b',
                                },
                                '& .MuiRating-iconEmpty': {
                                    color: '#ffffff',
                                },
                            }}
                        />


                    </div>
                </div>

            </div>

            <div className="bg-midnight p-8 rounded-2xl shadow-xl mb-8 flex gap-8">
                <div className="relative group">
                    <img
                        src={movies.movie.poster_url}
                        alt={movies.movie.name}
                        className='w-[250px] h-[375px] rounded-xl object-cover transform transition-transform duration-300 group-hover:scale-105'
                    />
                </div>

                <div className='flex-1 space-y-6'>
                    <h1 className="text-3xl font-bold">{movies.movie.name}</h1>
                    <p className="text-gray-300 text-lg leading-relaxed">{movies.movie.content}</p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                            <FaClock className="text-yellow-400" />
                            <span>{movies.movie.time}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                            <FaCalendarAlt className="text-yellow-400" />
                            <span>{movies.movie.year}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                            <FaTags className="text-yellow-400" />
                            <span>{movies.movie.category?.map(cat => cat.name).join(", ")}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6 mb-8">
                <div className="flex items-center gap-3 text-xl font-semibold">
                    <FaFilm className="text-yellow-400" />
                    <span>Danh sách tập phim</span>
                </div>
                <select
                    value={selectedServer}
                    onChange={handleServerChange}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[200px]"
                >
                    {movies.episodes.map((server, index) => (
                        <option key={index} value={index}>
                            {server.server_name}
                        </option>
                    ))}
                </select>

                <div className="grid grid-cols-6 gap-4">
                    {movies.episodes[selectedServer].server_data.map((episode, index) => (
                        <button
                            key={index}
                            value={index}
                            onClick={handleEpisodeChange}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${episode.id === selectedEpisode.id
                                ? 'bg-yellow-400 text-gray-900'
                                : 'bg-tahiti hover:bg-gray-700'
                                }`}
                        >
                            <FaPlay className="text-sm" />
                            <span className="font-medium">{episode.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <Comment />

        </div>
    );
}

export default PlayMovie;