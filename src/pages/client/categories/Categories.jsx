import React, { useContext, useState, useEffect } from 'react';
import { ContextCategories } from '../../../context/CategoriesProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaFilm, FaTicketAlt, FaChevronRight, FaCompass } from 'react-icons/fa';

export default function Categories() {
    const internalCategories = useContext(ContextCategories);
    const [apiGenres, setApiGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('all'); // 'all' | 'api' | 'platform'

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setLoading(true);
                const res = await axios.get('https://phimapi.com/the-loai');
                if (res.data?.status === 'success' && res.data?.data?.items) {
                    setApiGenres(res.data.data.items);
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchGenres();
    }, []);

    return (
        <div className="w-full min-h-screen pt-24 pb-16 px-3 sm:px-6 md:px-10 bg-stone-950 text-stone-100">
            {/* Header Marquee */}
            <div className="border-b border-stone-800 pb-6 mb-8">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono tracking-widest uppercase bg-stone-900 text-amber-400 border border-amber-500/30 mb-2">
                    <FaTicketAlt className="text-xs" />
                    CINEMA DIRECTORY • THỂ LOẠI ĐIỆN ẢNH
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-stone-100 mt-1">
                    Khám Phá Toàn Bộ Thể Loại
                </h1>
                <p className="text-stone-400 text-sm mt-1 max-w-2xl font-light">
                    Hàng nghìn tác phẩm từ kinh điển bất hủ đến bom tấn hiện đại được phân loại chi tiết theo từng đề tài
                </p>

                {/* Filter Tabs */}
                <div className="flex gap-2 mt-6">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-4 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                            activeTab === 'all'
                                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                        }`}
                    >
                        Tất cả ({apiGenres.length + internalCategories.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('api')}
                        className={`px-4 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                            activeTab === 'api'
                                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                        }`}
                    >
                        Kho Phim Quốc Tế ({apiGenres.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('platform')}
                        className={`px-4 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                            activeTab === 'platform'
                                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                        }`}
                    >
                        Tuyển Tập StreamFlix ({internalCategories.length})
                    </button>
                </div>
            </div>

            {/* Platform Categories */}
            {(activeTab === 'all' || activeTab === 'platform') && internalCategories.length > 0 && (
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <h2 className="text-lg font-serif font-bold text-amber-300">
                            Bộ Sưu Tập Tuyển Chọn StreamFlix
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                        {internalCategories.map((cat, idx) => (
                            <Link
                                to={`/main/movies/${cat.id}`}
                                key={cat.id || idx}
                                className="group relative bg-stone-900/90 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/70 rounded-lg p-4 flex flex-col justify-between h-[110px] transition-all duration-300 shadow-md hover:shadow-amber-500/10 cursor-pointer overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-3 h-3 bg-stone-950 rounded-bl-md border-b border-l border-stone-800 group-hover:border-amber-500/50" />
                                <div className="flex justify-between items-center text-[10px] font-mono text-amber-400/80">
                                    <span>STREAMFLIX • 0{idx + 1}</span>
                                    <FaFilm className="text-stone-600 group-hover:text-amber-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-stone-200 group-hover:text-amber-300 text-base truncate">
                                        {cat.name}
                                    </h3>
                                    <div className="text-[11px] text-stone-400 font-mono flex items-center gap-1 mt-1 group-hover:text-stone-300">
                                        <span>Xem danh sách</span>
                                        <FaChevronRight className="text-[9px] transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* API Genres (phimapi) */}
            {(activeTab === 'all' || activeTab === 'api') && (
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <h2 className="text-lg font-serif font-bold text-amber-300">
                            Thể Loại Điện Ảnh Toàn Cầu
                        </h2>
                    </div>

                    {loading && !apiGenres.length ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="h-[100px] bg-stone-900 rounded-lg border border-stone-800 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                            {apiGenres.map((genre, idx) => (
                                <Link
                                    to={`/main/the-loai/${genre.slug}`}
                                    key={genre.slug || idx}
                                    className="group relative bg-stone-900/80 hover:bg-stone-800/90 border border-stone-800/90 hover:border-amber-500/70 rounded-lg p-4 flex flex-col justify-between h-[100px] transition-all duration-300 shadow-md hover:shadow-amber-500/10 cursor-pointer overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-3 h-3 bg-stone-950 rounded-bl-md border-b border-l border-stone-800 group-hover:border-amber-500/50" />
                                    <div className="flex justify-between items-center text-[10px] font-mono text-stone-500 group-hover:text-amber-400">
                                        <span>GENRE • #{idx + 1}</span>
                                        <FaTicketAlt className="text-stone-600 group-hover:text-amber-500/80 text-[10px]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-stone-200 group-hover:text-amber-300 text-sm sm:text-base truncate">
                                            {genre.name}
                                        </h3>
                                        <div className="text-[10px] text-stone-400 font-mono flex items-center gap-1 mt-0.5 group-hover:text-amber-200">
                                            <span>Khám phá phim</span>
                                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
