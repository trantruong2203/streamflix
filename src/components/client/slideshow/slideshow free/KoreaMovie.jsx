import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './KoreaMovie.css';

export default function KoreaMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(`https://phimapi.com/v1/api/quoc-gia/han-quoc?page=1&year=2025&limit=10`);
                if (response.data.status === "success") {
                    setMovies(response.data.data.items);
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
    }, []);

    // Loading skeleton component
    const LoadingSkeleton = () => (
        <div className="mt-5">
            <div className="p-3 mb-4">
                <div className="h-8 bg-gradient-to-r from-yellow-500 to-purple-500 bg-clip-text text-transparent text-3xl font-bold">
                    Phim Hàn Quốc Mới
                </div>
            </div>
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 5 },
                    480: { slidesPerView: 2, spaceBetween: 5 },
                    768: { slidesPerView: 4, spaceBetween: 10 },
                    1024: { slidesPerView: 5, spaceBetween: 20 },
                    1280: { slidesPerView: 6, spaceBetween: 20 }
                }}
                className="movie-swiper"
            >
                {[...Array(6)].map((_, index) => (
                    <SwiperSlide key={index}>
                        <div className="p-3 text-center rounded-lg">
                            <div className="w-full h-[300px] bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg animate-pulse relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                            </div>
                        </div>
                        <div className="p-2 text-center">
                            <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 mx-auto w-3/4"></div>
                            <div className="h-3 bg-gray-600 rounded animate-pulse w-1/2 mx-auto"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );

    // Error component
    const ErrorMessage = () => (
        <div className="mt-5 text-center py-8">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <h3 className="text-white text-lg font-semibold mb-2">Không thể tải dữ liệu</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-purple-500 text-white rounded-lg hover:from-yellow-600 hover:to-purple-600 transition-all duration-300"
            >
                Thử lại
            </button>
        </div>
    );

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <ErrorMessage />;
    }

    return (
        <div className='mt-5'>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-purple-500 bg-clip-text text-transparent p-3 mb-4">
                Phim Hàn Quốc Mới
            </h1>
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 5 },
                    480: { slidesPerView: 2, spaceBetween: 5 },
                    768: { slidesPerView: 4, spaceBetween: 10 },
                    1024: { slidesPerView: 5, spaceBetween: 20 },
                    1280: { slidesPerView: 6, spaceBetween: 20 }
                }}
                className="movie-swiper"
            >
                {movies.map((movie) => (
                    <SwiperSlide 
                        key={movie._id} 
                        onClick={() => navigate(`/movie/${movie.slug}`)}
                        className='cursor-pointer group'
                    >
                        <div className="p-3 text-center rounded-lg overflow-hidden movie-card">
                            <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                                <img 
                                    src={`https://phimimg.com/${movie.poster_url}`} 
                                    alt={movie.name} 
                                    className='w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110'
                                    onError={(e) => {
                                        e.target.src = '/src/assets/avg001.jpg'; // Fallback image
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="movie-overlay"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="text-white text-sm font-semibold truncate">{movie.name}</div>
                                    {movie.year && (
                                        <div className="text-yellow-400 text-xs">{movie.year}</div>
                                    )}
                                    {movie.episode_current && (
                                        <div className="text-blue-400 text-xs mt-1">
                                            {movie.time}
                                        </div>
                                    )}
                                </div>
                                {/* Play button overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 text-white text-center">
                            <h3 className="font-semibold text-sm truncate group-hover:text-yellow-400 transition-colors duration-300">
                                {movie.name}
                            </h3>
                            {movie.episode_current && (
                                <p className="text-xs text-gray-400 mt-1">
                                    {movie.episode_current}
                                </p>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
