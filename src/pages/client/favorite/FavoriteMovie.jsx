import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavoritesContext } from '../../../context/FavoritesProvider';
import { MoviesContext } from '../../../context/MoviesProvider';
import { getOjectById } from '../../../services/FunctionRepon';
import { FaHeart, FaTicketAlt } from 'react-icons/fa';

function FavoriteMovie(props) {
    const favoriteMovies = useContext(FavoritesContext);
    const navigate = useNavigate();
    const movies = useContext(MoviesContext);

    return (
        <div className='w-full min-h-screen px-3 sm:px-6 md:px-10 pt-24 pb-16 bg-stone-950 text-stone-100'>
            <div className="text-center mb-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-stone-900 text-amber-400 border border-amber-500/30 mb-2">
                    <FaHeart className="text-[9px] text-amber-500" />
                    MY WATCHLIST • BỘ SƯU TẬP
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-100 tracking-tight">
                    Danh Sách Phim Yêu Thích
                </h1>
                <p className="text-stone-400 text-xs sm:text-sm mt-1 font-mono">
                    {favoriteMovies.length} bộ phim đã lưu trong danh sách theo dõi
                </p>
            </div>

            {favoriteMovies.length === 0 ? (
                <div className="text-center py-20 bg-stone-900/40 rounded-xl border border-stone-800 max-w-xl mx-auto">
                    <FaTicketAlt className="text-3xl text-stone-600 mx-auto mb-3" />
                    <p className="text-stone-400 text-sm font-mono mb-4">Bạn chưa lưu bộ phim nào vào danh sách yêu thích.</p>
                    <button
                        onClick={() => navigate('/main')}
                        className="px-5 py-2 bg-amber-500 text-stone-950 font-mono font-bold text-xs uppercase tracking-wider rounded-md hover:bg-amber-400 transition-all cursor-pointer"
                    >
                        Khám phá phim ngay
                    </button>
                </div>
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4'>
                    {favoriteMovies.map((item) => {
                        const internalMovie = getOjectById(movies, item.movieId);
                        const movieTitle = internalMovie?.name || item.name || 'Phim đã lưu';
                        const imgSrc = internalMovie?.imgUrl || item.poster_url || item.thumb_url || '/src/assets/avg001.jpg';

                        return (
                            <div
                                key={item.id}
                                onClick={() => {
                                    if (internalMovie?.id) {
                                        navigate(`/main/movies/detail/${internalMovie.id}`);
                                    } else if (item.id) {
                                        navigate(`/movie/${item.id}`);
                                    }
                                }}
                                className="group cursor-pointer select-none transition-all duration-300 flex flex-col"
                            >
                                <div className="relative aspect-[2/3] w-full rounded-md overflow-hidden bg-stone-900 border border-stone-800 group-hover:border-amber-500/60 shadow-lg group-hover:shadow-amber-500/10 transition-all">
                                    <img
                                        src={imgSrc}
                                        alt={movieTitle}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                                        onError={(e) => { e.target.src = '/src/assets/avg001.jpg'; }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                                    <span className="absolute top-2 right-2 p-1.5 rounded-full bg-stone-950/80 text-amber-500">
                                        <FaHeart className="text-xs" />
                                    </span>
                                </div>
                                <div className="pt-2">
                                    <h3 className="font-semibold text-xs sm:text-sm text-stone-200 group-hover:text-amber-400 transition-colors line-clamp-1">
                                        {movieTitle}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default FavoriteMovie;
