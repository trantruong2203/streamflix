import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function ListMovie() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { typeList } = useParams();
    const END_POINT = "danh-sach/";
    const limit = 24
    const [sortType, setSortType] = useState('');
    const [sortLang, setSortLang] = useState('');
    const [category, setCategory] = useState('');
    const [country, setCountry] = useState('');
    const [year, setYear] = useState('');
    const [sortField, setSortField] = useState('');

    const filterParams = {
        sort_field: sortField,
        sort_type: sortType,
        sort_lang: sortLang,
        category: category,
        country: country,
        year: year,
        limit: limit
    };

    useEffect(() => {
        const fetchMovies = async () => {
            if (!typeList) {
                console.warn("typeList is missing, skipping fetch.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const queryParams = new URLSearchParams({
                    ...Object.fromEntries(Object.entries(filterParams).filter(([, value]) => value !== '')),
                    page: page,
                }).toString();
                const url = `${API_BASE_URL}${typeList}?${queryParams}`;
                const response = await axios.get(url);
                console.log('URL:', url);
                console.log('response.data:', response.data);
                if (response.data.status) {
                    setMovies(response.data.items);
                    setTotalPages(response.data.pagination.totalPages);
                } else {
                    setError(response.data.msg);
                }

            } catch (err) {
                setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [page, API_BASE_URL, sortField, sortType, sortLang, category, country, year, typeList]);

    // Hàm xử lý sự kiện khi người dùng chọn một category mới
    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setCategory(newCategory);
        setPage(1);
    };

    const handleSortFieldChange = (e) => {
        setSortField(e.target.value);
        setPage(1);
    };

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
            <h1 className="text-3xl font-bold text-center text-emerald-50 mb-8">Phim Lẻ</h1>
            {loading ?
                <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] flex items-center justify-center bg-gray-900 text-white">
                    <div className="flex flex-col items-center gap-4">
                        <CircularProgress size={60} sx={{ color: '#fbbf24' }} />
                        <p className="text-xl text-yellow-400">Đang tải phim...</p>
                    </div>
                </div>
                : (
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
                                        src={movie.thumb_url}
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

export default ListMovie;