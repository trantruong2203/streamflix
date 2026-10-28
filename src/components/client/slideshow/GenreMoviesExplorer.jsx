import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaFilm, FaThLarge, FaExchangeAlt, FaChevronRight } from 'react-icons/fa';
import RetroMovieCard from '../movie/RetroMovieCard';
import 'swiper/css';
import 'swiper/css/navigation';

// Curated default genres to display immediately while fetching
const DEFAULT_GENRES = [
    { name: 'Hành Động', slug: 'hanh-dong' },
    { name: 'Kinh Điển', slug: 'kinh-dien' },
    { name: 'Cổ Trang', slug: 'co-trang' },
    { name: 'Tình Cảm', slug: 'tinh-cam' },
    { name: 'Kinh Dị', slug: 'kinh-di' },
    { name: 'Viễn Tưởng', slug: 'vien-tuong' },
    { name: 'Võ Thuật', slug: 'vo-thuat' },
    { name: 'Hài Hước', slug: 'hai-huoc' },
    { name: 'Tâm Lý', slug: 'tam-ly' },
    { name: 'Phiêu Lưu', slug: 'phieu-luu' },
    { name: 'Hoạt Hình', slug: 'hoat-hinh' },
    { name: 'Bí Ẩn', slug: 'bi-an' }
];

export default function GenreMoviesExplorer() {
    const [genres, setGenres] = useState(DEFAULT_GENRES);
    const [selectedSlug, setSelectedSlug] = useState('hanh-dong');
    const [moviesCache, setMoviesCache] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'grid'

    // Fetch genres list from /the-loai
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await axios.get('https://phimapi.com/the-loai');
                if (res.data?.status === 'success' && res.data?.data?.items?.length) {
                    setGenres(res.data.data.items);
                }
            } catch (err) {
                console.warn('Fallback to default genres list:', err.message);
            }
        };
        fetchGenres();
    }, []);

    // Fetch movies when selectedSlug changes
    useEffect(() => {
        if (!selectedSlug) return;

        // If already in cache, no need to refetch
        if (moviesCache[selectedSlug]) return;

        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await axios.get(`https://phimapi.com/v1/api/the-loai/${selectedSlug}?page=1&limit=18`);
                if (res.data?.status === true || res.data?.status === 'success' || res.data?.data?.items) {
                    const items = res.data?.data?.items || [];
                    setMoviesCache(prev => ({ ...prev, [selectedSlug]: items }));
                } else {
                    setError('Không thể tải danh sách phim cho thể loại này');
                }
            } catch (err) {
                console.error('Fetch genre movies error:', err);
                setError('Có lỗi xảy ra khi tải phim. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [selectedSlug]);

    const activeMovies = moviesCache[selectedSlug] || [];
    const activeGenre = genres.find(g => g.slug === selectedSlug) || { name: 'Thể loại', slug: selectedSlug };

    return (
        <section className="my-10 p-4 sm:p-6 rounded-xl bg-stone-900/60 border border-stone-800/90 shadow-2xl relative overflow-hidden">
            {/* Subtle retro background film watermark / accent */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            <FaFilm className="text-[10px]" />
                            CINEMA ARCHIVE
                        </span>
                        <span className="text-xs text-stone-400 font-mono">
                            • Tuyển tập phim theo thể loại
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-stone-100 tracking-tight flex items-center gap-2 font-serif sm:font-sans">
                        <span>Kho Phim Thể Loại:</span>
                        <span className="text-amber-400 font-serif italic">{activeGenre.name}</span>
                    </h2>
                </div>

                {/* View Mode & Link */}
                <div className="flex items-center gap-3 self-start md:self-auto">
                    <div className="flex items-center bg-stone-950 p-1 rounded-md border border-stone-800">
                        <button
                            type="button"
                            onClick={() => setViewMode('slider')}
                            className={`px-2.5 py-1 text-xs rounded font-mono transition-all ${
                                viewMode === 'slider' 
                                    ? 'bg-amber-500 text-stone-950 font-bold shadow' 
                                    : 'text-stone-400 hover:text-stone-200'
                            }`}
                        >
                            Cuộn ngang
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('grid')}
                            className={`px-2.5 py-1 text-xs rounded font-mono transition-all ${
                                viewMode === 'grid' 
                                    ? 'bg-amber-500 text-stone-950 font-bold shadow' 
                                    : 'text-stone-400 hover:text-stone-200'
                            }`}
                        >
                            Dạng lưới
                        </button>
                    </div>

                    <Link
                        to={`/main/free-movie/${selectedSlug}`}
                        className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-stone-300 hover:text-amber-300 px-3 py-1.5 rounded-md border border-stone-700/80 hover:border-amber-500/50 bg-stone-950/70 transition-all uppercase tracking-wider"
                    >
                        <span>Tất cả phim {activeGenre.name}</span>
                        <FaChevronRight className="text-[9px]" />
                    </Link>
                </div>
            </div>

            {/* Retro Ticket Pills Tabs Bar */}
            <div className="mb-6 -mx-2 px-2 overflow-x-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-transparent pb-2 flex gap-2 sm:gap-2.5">
                {genres.map((g) => {
                    const isActive = g.slug === selectedSlug;
                    return (
                        <button
                            key={g.slug}
                            onClick={() => setSelectedSlug(g.slug)}
                            className={`flex-shrink-0 px-3.5 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                                isActive
                                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md shadow-amber-500/20 scale-102'
                                    : 'bg-stone-950/80 text-stone-300 border-stone-800 hover:border-amber-500/50 hover:text-amber-200 hover:bg-stone-900'
                            }`}
                        >
                            {g.name}
                        </button>
                    );
                })}
            </div>

            {/* Movies Display */}
            {loading && !activeMovies.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex flex-col animate-pulse">
                            <div className="aspect-[2/3] w-full bg-stone-800/60 rounded-md border border-stone-700/40"></div>
                            <div className="h-4 bg-stone-800 rounded w-3/4 mt-2"></div>
                            <div className="h-3 bg-stone-800/60 rounded w-1/2 mt-1"></div>
                        </div>
                    ))}
                </div>
            ) : error && !activeMovies.length ? (
                <div className="text-center py-10 bg-stone-950/60 rounded-lg border border-stone-800">
                    <p className="text-stone-400 text-sm mb-3">{error}</p>
                    <button
                        onClick={() => {
                            setMoviesCache(prev => {
                                const updated = { ...prev };
                                delete updated[selectedSlug];
                                return updated;
                            });
                            setSelectedSlug(selectedSlug);
                        }}
                        className="px-4 py-1.5 text-xs bg-amber-500 text-stone-950 rounded font-mono font-semibold hover:bg-amber-400"
                    >
                        Thử lại
                    </button>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                    {activeMovies.slice(0, 12).map((movie) => (
                        <RetroMovieCard key={movie._id || movie.slug} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="relative group/exp">
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
                        {activeMovies.map((movie) => (
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

