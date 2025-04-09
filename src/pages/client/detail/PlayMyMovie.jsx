import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MoviesContext } from '../../../context/MoviesProvider';
import { EpisodesContext } from '../../../context/EpisodesProvider';
import { ContextCategories } from '../../../context/CategoriesProvider';
import { getOjectById } from '../../../services/FunctionRepon';
function PlayMyMovie() {
    const { id } = useParams();
    const movies = useContext(MoviesContext);
    const episodes = useContext(EpisodesContext);
    const categories = useContext(ContextCategories);
    const [selectedEpisode, setSelectedEpisode] = useState(0);

    const movie = movies.find(m => m.id === id);
    const episode = episodes.find(e => e.idMovie === id);

    if (!movie) {
        return <div className="flex items-center justify-center min-h-screen text-white text-lg">Đang tải...</div>;
    }

    const handleEpisodeChange = (e) => {
        setSelectedEpisode(parseInt(e.target.value));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-25 min-h-screen text-white">
            <div className="w-full h-full mt-10">
                <iframe 
                    src={episode?.episodesUrl} 
                    title="Video Player" 
                    className=" w-full h-[100vh]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <h1 className="text-2xl font-bold mb-4">{movie.name}</h1>
                <p className="text-gray-300 mb-4">{movie.description}</p>
                <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-700 px-3 py-1 rounded text-sm">Thời lượng: {movie.duration}</span>
                    <span className="bg-gray-700 px-3 py-1 rounded text-sm">Năm phát hành: {movie.year}</span>
                    <span className="bg-gray-700 px-3 py-1 rounded text-sm">Thể loại: {movie.listCate?.map(cat => getOjectById(categories, cat)?.name).join(", ")}</span>
                </div>
            </div>

            <div className="gap-4 mb-8">
                <select 
                    value={selectedEpisode} 
                    onChange={handleEpisodeChange}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[200px]"
                >
                    {episodes
                        .filter(ep => ep.idMovie === id)
                        .map((episode, index) => (
                            <option key={index} value={index}>
                                Tập {episode.episodesNumber}
                            </option>
                        ))}
                </select>
            </div>
        </div>
    );
}

export default PlayMyMovie;