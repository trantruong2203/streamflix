import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaFilm } from 'react-icons/fa';
import RetroMovieCard from '../movie/RetroMovieCard';
import 'swiper/css';
import 'swiper/css/navigation';

export default function MovieGenreRow({ genreSlug, title, subtitle, badge = "REEL SELECTION", limit = 12 }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGenreMovies = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`https://phimapi.com/v1/api/the-loai/${genreSlug}?page=1&limit=${limit}`);
            if (response.data.status === true || response.data.status === "success" || response.data?.data?.items) {
                setMovies(response.data.data.items || []);
            } else {
                setError(response.data.msg || 'Không thể tải danh sách phim');
            }
        } catch (err) {
            console.error(`Error loading genre ${genreSlug}:`, err);
            setError('Có lỗi xảy ra khi tải phim. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (genreSlug) {
            fetchGenreMovies();
        }
    }, [genreSlug, limit]);

    if (error && movies.length === 0) {
        return null; // Gracefully degrade if endpoint is unavailable
    }

    return (
        <section className="my-8 sm:my-10">
            {/* Retro Marquee Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1 sm:px-2 mb-4 border-b border-stone-800/80 pb-3">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-stone-900 text-amber-400 border border-amber-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                            {badge}
                        </span>
                        {subtitle && (
                            <span className="text-xs text-stone-400 font-serif italic hidden md:inline">
                                • {subtitle}
                            </span>
                        )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-stone-100 tracking-tight flex items-center gap-2">
                        <span>{title}</span>
                    </h2>
                </div>

                <Link
                    to={`/main/free-movie/${genreSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400/90 hover:text-amber-300 transition-colors uppercase tracking-wider py-1 group self-start sm:self-end"
                >
                    <span>Khám phá thêm</span>
                    <FaChevronRight className="text-[10px] transform group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Slider or Loading State */}
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 px-1">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex flex-col animate-pulse">
                            <div className="aspect-[2/3] w-full bg-stone-800/70 rounded-md border border-stone-700/40"></div>
                            <div className="h-4 bg-stone-800 rounded w-3/4 mt-2.5"></div>
                            <div className="h-3 bg-stone-800/50 rounded w-1/2 mt-1.5"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="relative group/carousel">
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        spaceBetween={14}
                        slidesPerView={2.2}
                        breakpoints={{
                            480: { slidesPerView: 2.5, spaceBetween: 12 },
                            640: { slidesPerView: 3.2, spaceBetween: 14 },
                            768: { slidesPerView: 4.2, spaceBetween: 16 },
                            1024: { slidesPerView: 5.2, spaceBetween: 18 },
                            1280: { slidesPerView: 6, spaceBetween: 18 }
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
            )}
        </section>
    );
}

