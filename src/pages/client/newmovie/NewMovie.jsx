import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import LoadingScreen from '../../../components/client/LoadingScreen';

function NewMovie(props) {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

   

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?page=${page}`);
                if (response.data.status) {
                    setMovies(response.data.items);
                    setTotalPages(response.data.pagination.totalPages || 1);
                } else {
                    setError(response.data.msg || 'Không thể tải dữ liệu phim');
                }
            } catch (err) {
                setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
                console.error(err);
            } finally {
                setLoading(false);

            }
        };

        fetchMovies();
    }, [page]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-red-50 rounded-lg m-5">
                <h2 className="text-red-500 text-xl font-bold mb-2">Lỗi</h2>
                <p className="text-gray-600 mb-5">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    return (
            <div className="p-5 max-w-7xl mx-auto py-20">
                <h1 className="text-3xl font-bold text-center text-white mb-8">Phim Mới Cập Nhật</h1>
                {loading ? <LoadingScreen /> : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                            {movies.map((movie) => (
                                <div 
                                    key={movie._id} 
                                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                                    onClick={() => {
                                        if (movie.slug) {
                                            navigate(`/movie/${movie.slug}`);
                                        } else {
                                            console.error('Không tìm thấy slug cho phim:', movie.name);
                                        }
                                    }}
                                >
                                    <img 
                                        src={movie.poster_url} 
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
                        <div className="flex justify-center items-center gap-5 mt-8">
                            <button 
                                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                className="p-3 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                            >
                                <FaArrowLeft />
                            </button>
                            <span className="text-white p-3 bg-gray-700 rounded-3xl">Trang {page} / {totalPages}</span>
                            <button 
                                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={page === totalPages}
                                className="p-3 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                            >
                                <FaArrowRight />
                            </button>
                        </div>
                    </>
                )}
            </div>
    );
}

export default NewMovie;