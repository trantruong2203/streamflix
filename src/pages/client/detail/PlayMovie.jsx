import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import useFetchMovie from "../../../hooks/useFetchMovie";
import { FaFilm, FaArrowLeft, FaServer, FaTicketAlt } from "react-icons/fa";

function PlayMovie() {
    const { slug } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const { movieData: movie, episodes, loading, error } = useFetchMovie(slug);
    const [serverIndex, setServerIndex] = useState(0);
    const [episodeIndex, setEpisodeIndex] = useState(0);

    // Sync selected episode with ?ep=
    useEffect(() => {
        const epSlug = searchParams.get("ep");
        if (!epSlug || !episodes?.length) return;

        let foundS = 0, foundE = 0;
        episodes.forEach((server, sIdx) => {
            server.server_data?.forEach((ep, eIdx) => {
                if (ep.slug === epSlug) {
                    foundS = sIdx;
                    foundE = eIdx;
                }
            });
        });

        setServerIndex(foundS);
        setEpisodeIndex(foundE);
    }, [episodes, searchParams]);

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-950 text-stone-300 flex items-center justify-center pt-20">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    <p className="font-mono text-xs uppercase tracking-widest text-amber-400">Đang khởi tạo máy chiếu phim...</p>
                </div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-stone-950 text-stone-300 flex flex-col items-center justify-center pt-24 px-4 text-center">
                <p className="text-amber-500 text-3xl mb-2">🎞️</p>
                <h2 className="text-xl font-bold font-serif text-stone-100 mb-2">Không tìm thấy phim để phát</h2>
                <button
                    onClick={() => navigate('/main')}
                    className="px-5 py-2 bg-amber-500 text-stone-950 font-mono font-bold text-xs uppercase tracking-wider rounded-md hover:bg-amber-400 transition-all cursor-pointer mt-4"
                >
                    Về trang chủ
                </button>
            </div>
        );
    }

    const currentServer = episodes?.[serverIndex];
    const currentEpisode = currentServer?.server_data?.[episodeIndex];

    return (
        <div className="min-h-screen bg-stone-950 text-stone-100 pt-20 pb-16 px-3 sm:px-6 md:px-10">
            {/* Top Bar Navigation & Movie Title */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-stone-800/80 pb-3">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(`/movie/${movie.slug}`)}
                        className="px-3 py-1.5 rounded-md bg-stone-900 border border-stone-800 hover:border-amber-500/60 text-stone-300 hover:text-amber-300 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
                    >
                        <FaArrowLeft className="text-xs" />
                        <span>Chi tiết phim</span>
                    </button>
                    <div>
                        <h1 className="text-lg sm:text-xl font-bold font-serif text-stone-100 truncate max-w-md sm:max-w-xl">
                            {movie.name}
                        </h1>
                        {currentEpisode && (
                            <span className="text-xs font-mono text-amber-400">
                                Đang phát: {currentEpisode.name} • {currentServer?.server_name}
                            </span>
                        )}
                    </div>
                </div>

                {/* Server selection */}
                {episodes?.length > 1 && (
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-stone-400 flex items-center gap-1.5">
                            <FaServer className="text-xs text-amber-500" /> Server:
                        </span>
                        <select
                            className="bg-stone-900 text-stone-200 border border-stone-800 rounded px-3 py-1.5 text-xs font-mono outline-none focus:border-amber-500 cursor-pointer"
                            value={serverIndex}
                            onChange={(e) => {
                                setServerIndex(Number(e.target.value));
                                setEpisodeIndex(0);
                            }}
                        >
                            {episodes.map((s, i) => (
                                <option key={i} value={i}>{s.server_name || `Server ${i + 1}`}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Video Player Box with Cinema Frame */}
            <div className="w-full rounded-xl overflow-hidden border border-stone-800 shadow-2xl bg-black aspect-video max-h-[82vh] mx-auto">
                {currentEpisode?.link_embed ? (
                    <iframe
                        src={currentEpisode.link_embed}
                        className="w-full h-full"
                        allowFullScreen
                        title={movie.name}
                        sandbox="allow-same-origin allow-scripts allow-forms"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                        <FaFilm className="text-4xl text-stone-600 mb-2" />
                        <p className="text-stone-400 text-sm font-mono">Chưa có liên kết phát cho tập này.</p>
                    </div>
                )}
            </div>

            {/* Episodes Selection Vault */}
            {currentServer?.server_data && currentServer.server_data.length > 0 && (
                <div className="mt-8 p-4 sm:p-6 bg-stone-900/60 rounded-xl border border-stone-800/90 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <FaTicketAlt className="text-amber-500 text-sm" />
                            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-stone-100">
                                Chọn tập phim ({currentServer.server_data.length} tập)
                            </h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
                        {currentServer.server_data.map((ep, idx) => {
                            const isCurrent = idx === episodeIndex;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setEpisodeIndex(idx)}
                                    className={`py-2 px-2.5 rounded text-xs font-mono font-semibold transition-all cursor-pointer truncate text-center border ${
                                        isCurrent
                                            ? "bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-500/20 font-bold scale-105"
                                            : "bg-stone-950 text-stone-300 border-stone-800 hover:border-amber-500/50 hover:text-amber-300"
                                    }`}
                                >
                                    {ep.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PlayMovie;
