import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PlayMovie.css';

function PlayMovie() {
    const { id } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        // TODO: Thay thế bằng API call thực tế
        const fetchMovieData = async () => {
            try {
                // const response = await fetch(`/api/movies/${id}`);
                // const data = await response.json();
                // setMovieData(data);
                
                // Dữ liệu mẫu
                setMovieData({
                    title: "Tên Phim",
                    description: "Mô tả phim sẽ được hiển thị ở đây...",
                    releaseYear: 2024,
                    genres: ["Hành động", "Phiêu lưu"],
                    duration: "120 phút"
                });
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu phim:", error);
            }
        };

        fetchMovieData();
    }, [id]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = (e) => {
        setCurrentTime(e.target.currentTime);
    };

    const handleLoadedMetadata = (e) => {
        setDuration(e.target.duration);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (!movieData) {
        return <div className="loading">Đang tải...</div>;
    }

    return (
        <div className="play-movie-container">
            <div className="video-wrapper">
                <iframe 
                    src="https://player.phimapi.com/player/?url=https://s4.phim1280.tv/20250402/G8eqQ3lQ/index.m3u8" 
                    title="Video Player" 
                    className="video-player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            
            <div className="movie-info">
                <h1>{movieData.title}</h1>
                <p className="description">{movieData.description}</p>
                <div className="movie-meta">
                    <span>Thời lượng: {movieData.duration}</span>
                    <span>Năm phát hành: {movieData.releaseYear}</span>
                    <span>Thể loại: {movieData.genres.join(", ")}</span>
                </div>
            </div>

            <div className="video-controls">
                <button onClick={handlePlayPause} className="control-button">
                    {isPlaying ? 'Tạm dừng' : 'Phát'}
                </button>
                <div className="progress-bar">
                    <div 
                        className="progress" 
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                </div>
                <span className="time">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
        </div>
    );
}

export default PlayMovie;