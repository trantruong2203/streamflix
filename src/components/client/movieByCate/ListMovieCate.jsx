import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaFilm, FaTicketAlt } from 'react-icons/fa';
import { MoviesContext } from '../../../context/MoviesProvider';
import { ContextCategories } from '../../../context/CategoriesProvider';

function ListMovieCate() {
    const navigate = useNavigate();
    const { id } = useParams();
    const movies = useContext(MoviesContext);
    const categories = useContext(ContextCategories);
    const [movieByCate, setMovieByCate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const currentCatName = categories.find(item => item.id === id)?.name || 'Thể Loại Phim';

    useEffect(() => {
        setLoading(true);
        const listMovie = movies.filter((movie) => movie.listCate?.some((catId) => catId === id));
        setMovieByCate(listMovie);
        setTotalPages(Math.ceil(listMovie.length / 24) || 1);
        setPage(1);
        setLoading(false);
    }, [id, movies]);

    const startIdx = (page - 1) * 24;
    const endIdx = startIdx + 24;
    const moviesToShow = movieByCate.slice(startIdx, endIdx);

    return (
        <div className="w-full min-h-screen px-3 sm:px-6 md:px-10 pt-24 pb-16 bg-stone-950 text-stone-100">
            <div className="text-center mb-8">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-stone-900 text-amber-400 border border-amber-500/30 mb-2">
                    <FaTicketAlt className="text-[9px]" />
                    STREAMFLIX CATEGORY
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-100 tracking-tight">
                    {currentCatName}
                </h1>
                <p className="text-stone-400 text-xs sm:text-sm mt-1 font-mono">
                    {movieByCate.length} bộ phim trong danh mục
                </p>
            </div>

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
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 mb-8">
                        {moviesToShow.length > 0 ? (
                            moviesToShow.map((movie) => (
                                <div 
                                    key={movie.id} 
                                    onClick={() => navigate(`/main/movies/detail/${movie.id}`)}
                                    className="group cursor-pointer select-none transition-all duration-300 flex flex-col"
                                >
                                    <div className="relative aspect-[2/3] w-full rounded-md overflow-hidden bg-stone-900 border border-stone-800 group-hover:border-amber-500/60 shadow-lg group-hover:shadow-amber-500/10 transition-all">
                                        <img 
                                            src={movie.imgUrl || movie.imgBanner || '/src/assets/avg001.jpg'} 
                                            alt={movie.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                                            onError={(e) => { e.target.src = '/src/assets/avg001.jpg'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                                    </div>
                                    <div className="pt-2">
                                        <h3 className="font-semibold text-xs sm:text-sm text-stone-200 group-hover:text-amber-400 transition-colors line-clamp-1">
                                            {movie.name}
                                        </h3>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-stone-400 py-16 bg-stone-900/40 rounded-xl border border-stone-800 font-mono text-xs">
                                Chưa có phim nào trong thể loại này.
                            </div>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-3 mt-10">
                            <button
                                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 text-amber-400 hover:bg-amber-500 hover:text-stone-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center cursor-pointer shadow-md"
                            >
                                <FaChevronLeft className="text-xs" />
                            </button>

                            <span className="text-stone-300 px-4 py-2 bg-stone-900/90 rounded-md border border-stone-800 font-mono text-xs tracking-wider">
                                Trang <strong className="text-amber-400 font-bold">{page}</strong> / {totalPages}
                            </span>

                            <button
                                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={page === totalPages}
                                className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 text-amber-400 hover:bg-amber-500 hover:text-stone-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center cursor-pointer shadow-md"
                            >
                                <FaChevronRight className="text-xs" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ListMovieCate;
