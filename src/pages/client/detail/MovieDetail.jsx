import React, { useEffect, useState, useContext } from 'react';
import { FaStar, FaPlay, FaPlus, FaHeart, FaFilm, FaTicketAlt, FaRegClock, FaCalendarAlt, FaGlobeAmericas } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { ContextAuth } from '../../../context/AuthProvider';
import { FavoritesContext } from '../../../context/FavoritesProvider';
import { useNotification } from '../../../context/NotificationProvide';
import { checkFavoriteMovie, getFavoriteMovie } from '../../../services/FunctionRepon';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function MovieDetail() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [movie, setMovie] = useState(null);
    const URL_API_MOVIE = import.meta.env.VITE_API_BASE_URL_MOVIE || 'https://phimapi.com/phim/';
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [value, setValue] = useState(0);
    const { accountLogin } = useContext(ContextAuth);
    const favorites = useContext(FavoritesContext);
    const notification = useNotification();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const baseUrl = URL_API_MOVIE.endsWith('/') ? URL_API_MOVIE : `${URL_API_MOVIE}/`;
                const response = await axios.get(`${baseUrl}${slug}`);

                if (response.data && response.data.movie) {
                    setMovie(response.data.movie);
                    setEpisodes(response.data.episodes || []);
                } else {
                    throw new Error('Dữ liệu phim không hợp lệ');
                }
            } catch (err) {
                console.error('Error fetching movie:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchMovie();
        }
    }, [slug, URL_API_MOVIE]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const convertYoutubeUrl = (url) => {
        if (!url) return "";
        try {
            const videoId = new URL(url).searchParams.get("v");
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
        } catch {
            return url;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-950 text-stone-300 flex items-center justify-center pt-20">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    <p className="font-mono text-xs uppercase tracking-widest text-amber-400">Đang tải thông tin phim...</p>
                </div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-stone-950 text-stone-300 flex flex-col items-center justify-center pt-20 px-4 text-center">
                <p className="text-amber-500 text-3xl mb-2">🎞️</p>
                <h2 className="text-xl font-bold font-serif text-stone-100 mb-2">Không tìm thấy thông tin phim</h2>
                <p className="text-stone-400 text-xs mb-4">{error || 'Phim có thể đã bị gỡ hoặc đường dẫn không đúng.'}</p>
                <button
                    onClick={() => navigate('/main')}
                    className="px-5 py-2 bg-amber-500 text-stone-950 font-mono font-bold text-xs uppercase tracking-wider rounded-md hover:bg-amber-400 transition-all cursor-pointer"
                >
                    Về trang chủ
                </button>
            </div>
        );
    }

    const posterUrl = movie.poster_url?.startsWith('http') ? movie.poster_url : `https://phimimg.com/${movie.poster_url}`;
    const thumbUrl = movie.thumb_url?.startsWith('http') ? movie.thumb_url : `https://phimimg.com/${movie.thumb_url}`;

    return (
        <div className="min-h-screen bg-stone-950 text-stone-100">
            {/* Cinematic Hero Backdrop */}
            <div className="relative h-[45vh] sm:h-[60vh] lg:h-[70vh] w-full overflow-hidden">
                <img
                    src={thumbUrl}
                    className="h-full w-full object-cover filter brightness-[0.4] scale-105 contrast-105"
                    alt={movie.name}
                    onError={(e) => { e.target.src = posterUrl; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-transparent" />
            </div>

            {/* Content Container */}
            <div className="w-full max-w-full px-4 sm:px-6 md:px-10 -mt-32 sm:-mt-48 lg:-mt-64 relative z-10 pb-20">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Left Column: Poster & Quick Metadata */}
                    <div className="w-full sm:w-[280px] lg:w-[320px] flex-shrink-0 mx-auto lg:mx-0">
                        <div className="rounded-xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900 relative group aspect-[2/3]">
                            <img 
                                src={posterUrl} 
                                className="w-full h-full object-cover" 
                                alt={movie.name} 
                                onError={(e) => { e.target.src = '/src/assets/avg001.jpg'; }}
                            />
                            {movie.quality && (
                                <span className="absolute top-3 left-3 px-2 py-0.5 text-xs font-mono font-bold bg-amber-500 text-stone-950 rounded shadow">
                                    {movie.quality}
                                </span>
                            )}
                            {movie.year && (
                                <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-mono bg-stone-950/90 text-amber-200 border border-stone-700/60 rounded">
                                    {movie.year}
                                </span>
                            )}
                        </div>

                        {/* Quick Specs */}
                        <div className="mt-4 p-4 rounded-xl bg-stone-900/70 border border-stone-800/80 space-y-2.5 text-xs font-mono">
                            {movie.time && (
                                <div className="flex items-center justify-between text-stone-300">
                                    <span className="text-stone-500 flex items-center gap-1.5"><FaRegClock /> Thời lượng:</span>
                                    <span>{movie.time}</span>
                                </div>
                            )}
                            {movie.episode_current && (
                                <div className="flex items-center justify-between text-stone-300">
                                    <span className="text-stone-500 flex items-center gap-1.5"><FaTicketAlt /> Trạng thái:</span>
                                    <span className="text-amber-400 font-semibold">{movie.episode_current}</span>
                                </div>
                            )}
                            {movie.lang && (
                                <div className="flex items-center justify-between text-stone-300">
                                    <span className="text-stone-500 flex items-center gap-1.5"><FaGlobeAmericas /> Ngôn ngữ:</span>
                                    <span>{movie.lang}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Title, Actions & Details Tabs */}
                    <div className="flex-1 flex flex-col">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-stone-900 text-amber-400 border border-amber-500/30 mb-2">
                                <FaFilm className="text-[9px]" />
                                CINEMA ARCHIVE REEL
                            </span>
                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif text-stone-100 tracking-tight">
                                {movie.name}
                            </h1>
                            {movie.origin_name && (
                                <p className="text-base sm:text-lg text-stone-400 italic font-light mt-1">
                                    {movie.origin_name}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 my-6 pt-2">
                            <button
                                onClick={() => navigate(`/play-movie/${movie.slug}`)}
                                className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-mono uppercase tracking-wider text-sm flex items-center gap-2 shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer transform hover:scale-102"
                            >
                                <FaPlay className="text-xs" />
                                <span>Xem ngay</span>
                            </button>

                            <button
                                onClick={() => {
                                    if (!accountLogin) {
                                        notification("Vui lòng đăng nhập để thực hiện chức năng này", "error");
                                        return;
                                    }
                                    const movieData = {
                                        id: movie.slug,
                                        name: movie.name,
                                        thumb_url: movie.thumb_url,
                                        poster_url: movie.poster_url
                                    };
                                    getFavoriteMovie(accountLogin, movieData, favorites, notification);
                                }}
                                className="px-4 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/50 text-stone-200 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                            >
                                <FaHeart className={checkFavoriteMovie(accountLogin, {id: movie?.slug}, favorites) ? "text-amber-500" : "text-stone-400"} />
                                <span>{checkFavoriteMovie(accountLogin, {id: movie?.slug}, favorites) ? "Đã lưu" : "Yêu thích"}</span>
                            </button>

                            <button
                                onClick={() => navigate('/main/vip')}
                                className="px-4 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/50 text-amber-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                            >
                                <MdAttachMoney className="text-base text-amber-400" />
                                <span>Gói VIP</span>
                            </button>
                        </div>

                        {/* Synopsis */}
                        {movie.content && (
                            <div className="bg-stone-900/50 rounded-xl p-4 sm:p-5 border border-stone-800/80 mb-6">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
                                    Nội dung phim
                                </h3>
                                <div 
                                    className="text-stone-300 text-sm leading-relaxed font-light"
                                    dangerouslySetInnerHTML={{ __html: movie.content }}
                                />
                            </div>
                        )}

                        {/* Tabs: Episodes, Information, Trailer */}
                        <Box sx={{ width: '100%', marginTop: '10px' }}>
                            <Box sx={{ borderBottom: 1, borderColor: '#2d2d38' }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="movie detail tabs"
                                    sx={{
                                        '& .MuiTab-root': {
                                            color: '#8f8f9d',
                                            fontFamily: 'monospace',
                                            textTransform: 'uppercase',
                                            fontSize: '13px',
                                            letterSpacing: '0.05em',
                                            '&.Mui-selected': {
                                                color: '#e5a93c',
                                                fontWeight: 'bold',
                                            },
                                        },
                                        '& .MuiTabs-indicator': {
                                            backgroundColor: '#e5a93c',
                                            height: 3,
                                        },
                                    }}
                                >
                                    <Tab label="Danh sách tập" {...a11yProps(0)} />
                                    <Tab label="Thông tin chi tiết" {...a11yProps(1)} />
                                    <Tab label="Trailer & Giới thiệu" {...a11yProps(2)} />
                                </Tabs>
                            </Box>

                            {/* Tab 0: Episodes */}
                            <CustomTabPanel value={value} index={0}>
                                <div className="space-y-6">
                                    {episodes && episodes.length > 0 ? (
                                        episodes.map((server, index) => (
                                            <div key={index} className="bg-stone-900/60 p-4 sm:p-5 rounded-xl border border-stone-800/80">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                    <h4 className="text-sm font-mono uppercase font-bold text-amber-300">
                                                        {server.server_name || `Server ${index + 1}`}
                                                    </h4>
                                                </div>
                                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                                                    {server.server_data?.map((episode, epIndex) => (
                                                        <button
                                                            key={epIndex}
                                                            onClick={() => navigate(`/play-movie/${movie.slug}?ep=${episode.slug}`)}
                                                            className="px-3 py-2 bg-stone-950 hover:bg-amber-500 hover:text-stone-950 text-stone-300 border border-stone-800 hover:border-amber-400 rounded text-xs font-mono font-medium transition-all cursor-pointer truncate shadow-sm"
                                                        >
                                                            {episode.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-stone-400 text-xs font-mono py-4">Chưa có tập phim nào được cập nhật.</p>
                                    )}
                                </div>
                            </CustomTabPanel>

                            {/* Tab 1: Detailed Info */}
                            <CustomTabPanel value={value} index={1}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-stone-900/60 p-4 sm:p-5 rounded-xl border border-stone-800/80 space-y-3 text-xs font-mono">
                                        <h3 className="text-amber-400 font-bold uppercase tracking-wider mb-3">
                                            Thông Tin Phim
                                        </h3>
                                        <p className="text-stone-300"><span className="text-stone-500">Tên gốc:</span> {movie.origin_name || 'N/A'}</p>
                                        <p className="text-stone-300"><span className="text-stone-500">Thời lượng:</span> {movie.time || 'N/A'}</p>
                                        <p className="text-stone-300"><span className="text-stone-500">Năm phát hành:</span> {movie.year || 'N/A'}</p>
                                        <p className="text-stone-300"><span className="text-stone-500">Thể loại:</span> {movie.category?.map(cat => cat.name).join(', ') || 'N/A'}</p>
                                        <p className="text-stone-300"><span className="text-stone-500">Quốc gia:</span> {movie.country?.map(c => c.name).join(', ') || 'N/A'}</p>
                                    </div>
                                    <div className="bg-stone-900/60 p-4 sm:p-5 rounded-xl border border-stone-800/80 space-y-3 text-xs font-mono">
                                        <h3 className="text-amber-400 font-bold uppercase tracking-wider mb-3">
                                            Đội Ngũ & Kỹ Thuật
                                        </h3>
                                        <p className="text-stone-300"><span className="text-stone-500">Đạo diễn:</span> {movie.director?.join(', ') || 'Đang cập nhật'}</p>
                                        <p className="text-stone-300"><span className="text-stone-500">Diễn viên:</span> {movie.actor?.join(', ') || 'Đang cập nhật'}</p>
                                        <p className="text-stone-300"><span className="text-stone-500">Chất lượng:</span> {movie.quality || 'FHD'}</p>
                                        <p className="text-stone-300"><span className="text-stone-500">Ngôn ngữ:</span> {movie.lang || 'Vietsub'}</p>
                                    </div>
                                </div>
                            </CustomTabPanel>

                            {/* Tab 2: Trailer */}
                            <CustomTabPanel value={value} index={2}>
                                <div className="bg-stone-900/60 p-4 rounded-xl border border-stone-800/80">
                                    {movie.trailer_url ? (
                                        <div className="aspect-video w-full rounded-lg overflow-hidden">
                                            <iframe
                                                src={convertYoutubeUrl(movie.trailer_url)}
                                                title="Trailer"
                                                className="w-full h-full"
                                                allowFullScreen
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-stone-400 text-xs font-mono py-8 text-center">
                                            Chưa có trailer chính thức cho bộ phim này.
                                        </p>
                                    )}
                                </div>
                            </CustomTabPanel>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
