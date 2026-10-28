import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RetroMovieCard from '../../movie/RetroMovieCard';
import './KoreaMovie.css';

export default function KoreaMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`https://phimapi.com/v1/api/quoc-gia/han-quoc?page=1&year=2025&limit=12`);
            if (response.data.status === "success" || response.data.status === true || response.data?.data?.items) {
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

    useEffect(() => {
        fetchMovies();
    }, []);

    const LoadingSkeleton = () => (
        <div className="mt-8 pt-4">
            <div className="flex items-center gap-2 mb-4 px-2">
                <div className="h-4 bg-stone-800 rounded w-28 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 px-1">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="aspect-[2/3] w-full bg-stone-800/60 rounded-md border border-stone-700/40"></div>
                        <div className="h-4 bg-stone-800 rounded w-3/4 mt-2"></div>
                    </div>
                ))}
            </div>
        </div>
    );

    const ErrorMessage = () => (
        <div className="mt-6 text-center py-8 bg-stone-900/40 rounded-lg border border-stone-800/80">
            <div className="text-amber-500 text-xl mb-2">🎞️</div>
            <h3 className="text-stone-200 text-base font-semibold mb-1">Không thể tải dữ liệu phim Hàn Quốc</h3>
            <p className="text-stone-400 text-xs mb-3">{error}</p>
            <button 
                onClick={fetchMovies}
                className="px-4 py-1.5 bg-amber-500 text-stone-950 font-mono text-xs font-semibold rounded hover:bg-amber-400 transition-all duration-300"
            >
                Thử lại
            </button>
        </div>
    );

    if (loading) return <LoadingSkeleton />;
    if (error && !movies.length) return <ErrorMessage />;

    return (
        <div className="mt-4">
            <div className="flex items-center justify-between mb-4 px-1">
                <div>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-stone-900 text-amber-400 border border-amber-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        K-CINEMA & DRAMA • 2025
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-stone-100 tracking-tight mt-1">
                        Phim Hàn Quốc Đặc Sắc
                    </h2>
                </div>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={14}
                slidesPerView={2.2}
                navigation
                breakpoints={{
                    480: { slidesPerView: 2.5, spaceBetween: 12 },
                    640: { slidesPerView: 3.2, spaceBetween: 14 },
                    768: { slidesPerView: 4.2, spaceBetween: 16 },
                    1024: { slidesPerView: 5.2, spaceBetween: 18 },
                    1280: { slidesPerView: 6.2, spaceBetween: 18 },
                    1536: { slidesPerView: 7.2, spaceBetween: 20 },
                    1920: { slidesPerView: 8.2, spaceBetween: 22 }
                }}
                className="retro-swiper !py-2 !px-1"
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie._id || movie.slug}>
                        <RetroMovieCard movie={movie} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
