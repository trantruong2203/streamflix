import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { checkFavoriteMovie, checkMovieList, getFavoriteMovie, getOjectById, moviesList, watchHistory } from '../../../services/FunctionRepon';
import { MoviesContext } from '../../../context/MoviesProvider';
import { EpisodesContext } from '../../../context/EpisodesProvider';
import { ContextCategories } from '../../../context/CategoriesProvider';
import { FaFilm, FaHeart, FaPlay, FaPlus, FaClock, FaCalendarAlt, FaTags } from 'react-icons/fa';
import Comment from '../../../components/client/Comment/Comment';
import { ContextAuth } from '../../../context/AuthProvider';
import { FavoritesContext } from '../../../context/FavoritesProvider';
import { MovieListContext } from '../../../context/MovieListProvider';
import { useNotification } from '../../../context/NotificationProvide';
import { WatchHistoryContext } from '../../../context/WatchHistoryProvider';

function PlayMyMovie() {
    const { id } = useParams();
    const movies = useContext(MoviesContext);
    const episodes = useContext(EpisodesContext);
    const categories = useContext(ContextCategories);
    const [selectedEpisode, setSelectedEpisode] = useState({});
    const movie = movies.find(m => m.id === id);
    const [nextEpisode, setNextEpisode] = useState(false);
    const { accountLogin } = useContext(ContextAuth);
    const favorites = useContext(FavoritesContext);
    const list = useContext(MovieListContext);
    const notification = useNotification();
    const watchHis = useContext(WatchHistoryContext)
    const [listEpisodes,setListEpisodes] = useState([]);

    useEffect(() => {
        const movieEpisodes = episodes.filter(ep => ep.idMovie === id).sort((a, b) => a.episodesNumber - b.episodesNumber);  
        // Set tập đầu tiên làm mặc định
        if (movieEpisodes.length > 0) {
            setListEpisodes(movieEpisodes);
            setSelectedEpisode(movieEpisodes[0]);
            addHis(movieEpisodes[0]);
        }
    }, [id, episodes]);

    if (!movie) {
        return <div className="flex items-center justify-center min-h-screen text-white text-lg">Đang tải...</div>;
    }

    const  addHis = async  (movieEpisodes) => {

       await  watchHistory(accountLogin,id,watchHis,movieEpisodes.id);  
    }
        
    const handleEpisodeChange = (selectedId) => {
         smoothScrollToTop(1000); 
        const episode = listEpisodes.find(ep => ep.id === selectedId);
        if (episode) {
            setSelectedEpisode(episode);
            addHis(episode);     
        }
    };

    function smoothScrollToTop(duration = 500) {
        const start = window.scrollY;
        const startTime = performance.now();
      
        function scroll(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3); // easing function (easeOutCubic)
          window.scrollTo(0, start * (1 - ease));
          if (progress < 1) {
            requestAnimationFrame(scroll);
          }
        }
      
        requestAnimationFrame(scroll);
      }
      

    return (
        <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen text-white">
            {/* Video Player Section */}
            <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl">
                <iframe
                    src={selectedEpisode?.episodesUrl}
                    title="Video Player"
                    className="w-full h-[80vh]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                ></iframe>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-8 mt-6 mb-8">
                <button 
                    onClick={() => getFavoriteMovie(accountLogin, movie, favorites, notification)} 
                    className='flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105'
                >
                    {checkFavoriteMovie(accountLogin, movie, favorites) ? (
                        <>
                            <FaHeart className="text-xl text-red-600" />
                            <span>Bỏ Yêu thích</span>
                        </>
                    ) : (
                        <>
                            <FaHeart className="text-xl" />
                            <span>Yêu thích</span>
                        </>
                    )}
                </button>

                <button
                    onClick={() => moviesList(accountLogin, movie, list, notification)}
                    className='flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105'
                >
                    {checkMovieList(accountLogin, movie, list) ? (
                        <>
                            <FaPlus className="text-xl text-yellow-400" />
                            <span>Bỏ Thêm vào</span>
                        </>
                    ) : (
                        <>
                            <FaPlus className="text-xl" />
                            <span>Thêm vào</span>
                        </>
                    )}
                </button>

                <button 
                    onClick={() => setNextEpisode(!nextEpisode)} 
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                    <span>Chuyển Tập</span>
                    <div className={`px-3 py-1 rounded-full ${nextEpisode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700'}`}>
                        {nextEpisode ? 'Bật' : 'Tắt'}
                    </div>
                </button>
            </div>

            {/* Movie Info Section */}
            <div className="bg-midnight p-8 rounded-2xl shadow-xl mb-8 flex gap-8">
                <div className="relative group">
                    <img 
                        src={movie.imgUrl} 
                        alt={movie.name} 
                        className='w-[250px] h-[375px] rounded-xl object-cover transform transition-transform duration-300 group-hover:scale-105' 
                    />
                </div>

                <div className='flex-1 space-y-6'>
                    <h1 className="text-3xl font-bold">{movie.name}</h1>
                    <p className="text-gray-300 text-lg leading-relaxed">{movie.description}</p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                            <FaClock className="text-yellow-400" />
                            <span>{movie.duration} phút</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                            <FaCalendarAlt className="text-yellow-400" />
                            <span>{movie.year}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                            <FaTags className="text-yellow-400" />
                            <span>{movie.listCate?.map(cat => getOjectById(categories, cat)?.name).join(", ")}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Episodes Section */}
            <div className="space-y-6 mb-8">
                <div className="flex items-center gap-3 text-xl font-semibold">
                    <FaFilm className="text-yellow-400" />
                    <span>Danh sách tập phim</span>
                </div>
                <div className="grid grid-cols-6 gap-4">
                    {listEpisodes.map((episode) => (
                        <button
                            key={episode.id}
                            onClick={() => handleEpisodeChange(episode.id)}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                                episode.id === selectedEpisode.id 
                                    ? 'bg-yellow-400 text-gray-900' 
                                    : 'bg-tahiti hover:bg-gray-700'
                            }`}
                        >
                            <FaPlay className="text-sm" />
                            <span className="font-medium">Tập {episode.episodesNumber}</span>
                        </button>
                    ))}
                </div>
            </div>

            <Comment />
        </div>
    );
}

export default PlayMyMovie;