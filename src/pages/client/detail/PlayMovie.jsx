import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PlayMovie() {
    const { slug } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [selectedServer, setSelectedServer] = useState(0);
    const [selectedEpisode, setSelectedEpisode] = useState(0);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await axios.get(`https://phimapi.com/phim/${slug}`);
                setMovieData(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu phim:", error);
            }
        };

        fetchMovieData();
    }, [slug]);

    if (!movieData) {
        return <div className="flex items-center justify-center min-h-screen text-white text-lg">Đang tải...</div>;
    }

    const handleServerChange = (e) => {
        setSelectedServer(parseInt(e.target.value));
        setSelectedEpisode(0);
    };

    const handleEpisodeChange = (e) => {
        setSelectedEpisode(parseInt(e.target.value));
    };
 
    return (
        <div className="max-w-7xl mx-auto p-20 bg-stone-600 min-h-screen text-white">
            <div className="relative w-full pt-[56.25%] mb-8 rounded-lg overflow-hidden">
                <iframe 
                    src={movieData.episodes[selectedServer].server_data[selectedEpisode].link_embed} 
                    title="Video Player" 
                    className="absolute top-0 left-0 w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            
            <div className="bg-stone-500 p-6 rounded-lg shadow-lg mb-8">
                <h1 className="text-2xl font-bold mb-4">{movieData.movie.name}</h1>
                <p className="text-gray-300 mb-4">{movieData.content}</p>
                <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-700 px-3 py-1 rounded text-sm">Thời lượng: {movieData.movie.time}</span>
                    <span className="bg-gray-700 px-3 py-1 rounded text-sm">Năm phát hành: {movieData.movie.year}</span>
                    <span className="bg-gray-700 px-3 py-1 rounded text-sm">Thể loại: {movieData.movie.category?.map(cat => cat.name).join(", ")}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
                <select 
                    value={selectedServer} 
                    onChange={handleServerChange}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[200px]"
                >
                    {movieData.episodes.map((server, index) => (
                        <option key={index} value={index}>
                            {server.server_name}
                        </option>
                    ))}
                </select>

                <select 
                    value={selectedEpisode} 
                    onChange={handleEpisodeChange}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[200px]"
                >
                    {movieData.episodes[selectedServer].server_data.map((episode, index) => (
                        <option key={index} value={index}>
                            {episode.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default PlayMovie;