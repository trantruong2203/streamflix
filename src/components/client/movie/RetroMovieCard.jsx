import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaRegClock, FaStar } from 'react-icons/fa';

export default function RetroMovieCard({ movie }) {
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = useState(
        movie?.poster_url
            ? (movie.poster_url.startsWith('http') ? movie.poster_url : `https://phimimg.com/${movie.poster_url}`)
            : (movie?.thumb_url ? (movie.thumb_url.startsWith('http') ? movie.thumb_url : `https://phimimg.com/${movie.thumb_url}`) : '/src/assets/avg001.jpg')
    );

    const handleImgError = () => {
        if (movie?.thumb_url && !imgSrc.includes(movie.thumb_url)) {
            setImgSrc(movie.thumb_url.startsWith('http') ? movie.thumb_url : `https://phimimg.com/${movie.thumb_url}`);
        } else {
            setImgSrc('/src/assets/avg001.jpg');
        }
    };

    const handleClick = () => {
        if (movie?.slug) {
            navigate(`/movie/${movie.slug}`);
        }
    };

    return (
        <div 
            onClick={handleClick}
            className="group cursor-pointer select-none transition-all duration-300 flex flex-col h-full"
        >
            {/* Film frame container with retro neutral aesthetic */}
            <div className="relative aspect-[2/3] w-full rounded-md overflow-hidden bg-stone-900 border border-stone-800/80 group-hover:border-amber-500/60 shadow-lg group-hover:shadow-amber-500/10 transition-all duration-300">
                {/* Poster image */}
                <img 
                    src={imgSrc} 
                    alt={movie?.name || 'Phim'}
                    onError={handleImgError}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-95 group-hover:brightness-105 contrast-[1.03]"
                />

                {/* Subtle vintage film vignette */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Top Badges: Quality & Lang in vintage stamp style */}
                <div className="absolute top-2 left-2 flex flex-wrap gap-1.5 z-10">
                    {movie?.quality && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider bg-stone-900/90 text-amber-300 border border-amber-500/40 rounded-sm shadow-sm backdrop-blur-xs">
                            {movie.quality}
                        </span>
                    )}
                    {movie?.lang && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono font-medium bg-neutral-900/85 text-stone-300 border border-stone-700/60 rounded-sm shadow-sm backdrop-blur-xs">
                            {movie.lang}
                        </span>
                    )}
                </div>

                {/* Top Right: Year stamp */}
                {movie?.year && (
                    <div className="absolute top-2 right-2 z-10">
                        <span className="px-1.5 py-0.5 text-[10px] font-mono bg-stone-950/80 text-amber-200/90 border border-stone-700/40 rounded-sm">
                            {movie.year}
                        </span>
                    </div>
                )}

                {/* Retro Play button hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-stone-950/40 backdrop-blur-[1px]">
                    <div className="w-12 h-12 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <FaPlay className="text-sm ml-0.5" />
                    </div>
                </div>

                {/* Bottom status (Episodes / Duration) */}
                {(movie?.episode_current || movie?.time) && (
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-stone-300 z-10">
                        {movie?.episode_current && (
                            <span className="truncate max-w-[70%] bg-stone-950/80 px-1.5 py-0.5 rounded text-amber-300/90 font-mono text-[10px] border border-stone-800">
                                {movie.episode_current}
                            </span>
                        )}
                        {movie?.time && (
                            <span className="flex items-center gap-1 text-[10px] text-stone-400 bg-stone-950/80 px-1 rounded ml-auto">
                                <FaRegClock className="text-[9px]" />
                                {movie.time}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Typography metadata with retro neutral tones */}
            <div className="pt-2.5 pb-1 flex flex-col flex-grow">
                <h3 
                    title={movie?.name}
                    className="font-semibold text-sm text-stone-200 group-hover:text-amber-400 transition-colors duration-200 line-clamp-1 leading-snug tracking-tight"
                >
                    {movie?.name}
                </h3>
                {movie?.origin_name && (
                    <p 
                        title={movie.origin_name}
                        className="text-xs text-stone-400 line-clamp-1 mt-0.5 font-light italic opacity-85"
                    >
                        {movie.origin_name}
                    </p>
                )}
            </div>
        </div>
    );
}

