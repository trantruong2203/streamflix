import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MoviesContext } from '../../../context/MoviesProvider';
import { ContextCategories } from '../../../context/CategoriesProvider';

function ListMovieCate(props) {
    const navigate = useNavigate();
    const { id } = useParams();
   const movies = useContext(MoviesContext);
   const category = useContext(ContextCategories);
    const [movieByCate, setMovieByCate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setLoading(true);
        const listMovie = movies.filter((movie) => movie.listCate.some((category) => category === id));
        setMovieByCate(listMovie);
        setTotalPages(Math.ceil(listMovie.length / 24));
        setPage(1); // Reset về trang 1 khi đổi thể loại
        setLoading(false);
    }, [id, movies]);

    // Lấy danh sách phim theo trang hiện tại
    const startIdx = (page - 1) * 24;
    const endIdx = startIdx + 24;
    const moviesToShow = movieByCate.slice(startIdx, endIdx);

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
            <h1 className="text-3xl font-bold text-center text-emerald-50 mb-8">{category.find(item => item.id === id)?.name}</h1>
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                    {[...Array(24)].map((_, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                            <Skeleton variant="rectangular" width="100%" height={280} animation="wave" />
                            <div className="p-3">
                                <Skeleton variant="text" animation="wave" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                        {moviesToShow.map((movie) => (
                            <div 
                                key={movie.id} 
                                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                                onClick={() => {
                                    if (movie.id) {
                                        navigate(`/main/movies/detail/${movie.id}`);
                                    } else {
                                        console.error('Không tìm thấy slug cho phim:', movie.name);
                                    }
                                }}
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

export default ListMovieCate;