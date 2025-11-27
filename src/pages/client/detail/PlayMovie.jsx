import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useFetchMovie from "../../../hooks/useFetchMovie";
import EpisodeList from "../../../components/client/movieDetail/EpisodeList";

function PlayMovie() {
    const { slug } = useParams();
    const [searchParams] = useSearchParams();

    const { movieData: movie, episodes, loading } = useFetchMovie(slug);
    const [serverIndex, setServerIndex] = useState(0);
    const [episodeIndex, setEpisodeIndex] = useState(0);

    // Fix đồng bộ tập theo ?ep=
    useEffect(() => {
        const epSlug = searchParams.get("ep");
        if (!epSlug || !episodes.length) return;

        let foundS = 0, foundE = 0;

        episodes.forEach((server, sIdx) => {
            server.server_data.forEach((ep, eIdx) => {
                if (ep.slug === epSlug) {
                    foundS = sIdx;
                    foundE = eIdx;
                }
            });
        });

        setServerIndex(foundS);
        setEpisodeIndex(foundE);
    }, [episodes, searchParams]);

    if (loading) return <p className="text-white">Đang tải...</p>;
    if (!movie) return <p className="text-red-500">Không tìm thấy phim</p>;

    const current = episodes[serverIndex].server_data[episodeIndex];

    return (
        <div className="text-white">
            {/* Player */}
            <iframe
                src={current.link_embed}
                className="w-full h-[80vh]"
                allowFullScreen
                sandbox="allow-same-origin allow-scripts"
            />

            {/* Chọn server */}
            <select
                className="mt-4 p-2 bg-gray-800"
                value={serverIndex}
                onChange={(e) => {
                    setServerIndex(Number(e.target.value));
                    setEpisodeIndex(0);
                }}
            >
                {episodes.map((s, i) => (
                    <option key={i} value={i}>{s.server_name}</option>
                ))}
            </select>

            {/* Chọn tập */}
            <div className="grid grid-cols-6 gap-3 mt-4">
                {episodes[serverIndex].server_data.map((ep, idx) => (
                    <button
                        key={idx}
                        onClick={() => setEpisodeIndex(idx)}
                        className={`p-2 rounded ${idx === episodeIndex ? "bg-yellow-400 text-black" : "bg-gray-700"}`}
                    >
                        {ep.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default PlayMovie;
