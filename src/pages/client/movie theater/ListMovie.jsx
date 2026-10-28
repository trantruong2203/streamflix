import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CardMovie from '../../../components/client/movie/cardMovie';

function ListMovie() {
    const navigate = useNavigate();
    const { typeList } = useParams();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://phimapi.com/';
    const endPoint = 'danh-sach/';

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 24;
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            if (!typeList) return;

            setLoading(true);
            setError(null);
            
            try {
                const url = `${API_BASE_URL}${endPoint}${typeList}?page=${page}&limit=${limit}`;
                const response = await axios.get(url);
                
                if (response.data.status) {
                    setMovies(response.data.items || []);
                    setTotalPages(response.data.pagination?.totalItems > 0 
                        ? Math.ceil(response.data.pagination.totalItems / limit) 
                        : 1);
                } else {
                    setError('Không tải được dữ liệu');
                }
            } catch (err) {
                console.error(err);
                setError('Lỗi kết nối server!');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [typeList, page, API_BASE_URL, endPoint]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (error && (!movies || movies.length === 0)) {
        return (
            <div className="w-full min-h-screen pt-28 text-center text-stone-400">
                <p className="font-mono text-sm mb-4">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-amber-500 text-stone-950 rounded font-mono font-bold text-xs"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen px-3 sm:px-6 md:px-10 pt-24 pb-16 bg-stone-950 text-stone-100">
            <div className="text-center mb-8">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-stone-900 text-amber-400 border border-amber-500/30 mb-2">
                    STREAMFLIX VAULT • CẬP NHẬT MỚI
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-100 tracking-tight">
                    Phim Mới Cập Nhật
                </h1>
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
                        {movies.length > 0 ? (
                            movies.map((movie) => (
                                <CardMovie movie={movie} key={movie._id || movie.slug} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-stone-400 py-16 bg-stone-900/40 rounded-xl border border-stone-800 font-mono text-xs">
                                Không tìm thấy phim nào trong danh sách.
                            </div>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-3 mt-10">
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 text-amber-400 hover:bg-amber-500 hover:text-stone-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center cursor-pointer shadow-md"
                            >
                                <FaChevronLeft className="text-xs" />
                            </button>

                            <span className="text-stone-300 px-4 py-2 bg-stone-900/90 rounded-md border border-stone-800 font-mono text-xs tracking-wider">
                                Trang <strong className="text-amber-400 font-bold">{page}</strong> / {totalPages}
                            </span>

                            <button
                                onClick={() => handlePageChange(page + 1)}
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

export default ListMovie;
