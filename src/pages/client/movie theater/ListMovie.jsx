import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {FILTER_OPTIONS} from '../../../utils/Contants';
import CardMovie from '../../../components/client/movie/cardMovie';

function ListMovie() {
    const navigate = useNavigate();
    const { typeList } = useParams();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

                const url = `${API_BASE_URL}${typeList}?limit=${limit}`;

                const response = await axios.get(url);
                
                if (response.data.status) {
                    setMovies(response.data.items);
                    setTotalPages(response.data.pagination.totalItems > 0 
                        ? Math.ceil(response.data.pagination.totalItems / 24) 
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
    }, [typeList, API_BASE_URL]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="p-5 max-w-7xl mx-auto py-20 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-emerald-400 mb-8 uppercase">
               Phim Mới Cập Nhật
            </h1>

            {/* --- PHẦN DANH SÁCH PHIM --- */}
            {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <CircularProgress size={60} sx={{ color: '#fbbf24' }} />
                    <p className="mt-4 text-yellow-400">Đang tải dữ liệu...</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                        {movies.length > 0 ? movies.map((movie) => (
                            <CardMovie movie={movie} key={movie._id} navigate={navigate} />
                        )) : (
                            <div className="col-span-full text-center text-gray-400 py-10">
                                Không tìm thấy phim nào phù hợp với bộ lọc.
                            </div>
                        )}
                    </div>

                    {movies.length > 0 && (
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all"
                            >
                                <FaArrowLeft />
                            </button>

                            <span className="text-white px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
                                Trang <strong className="text-emerald-400">{page}</strong> / {totalPages}
                            </span>

                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages}
                                className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all"
                            >
                                <FaArrowRight />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ListMovie;