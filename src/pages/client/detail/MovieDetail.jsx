import React, { useEffect, useState } from 'react';
import { FaStar, FaPlay, FaPlus, FaHeart } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

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
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

function MovieDetail(props) {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`https://phimapi.com/phim/${slug}`);
                console.log('API Response:', response.data);
                
                if (response.data && response.data.movie) {
                    setMovie(response.data.movie);
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

        const fetchEpisodes = async () => {
            try {
                const response = await axios.get(`https://phimapi.com/phim/${slug}`);
                setEpisodes(response.data.episodes);
            } catch (err) {
                console.error('Error fetching episodes:', err);
            }
        };

        if (slug) {
            fetchMovie();
            fetchEpisodes();
        }
    }, [slug]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (loading) return <div className="text-white text-center py-8">Đang tải...</div>;
    if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
    if (!movie) return <div className="text-white text-center py-8">Không tìm thấy phim</div>;

    return (
        <div className="bg-gray-900 text-white lg:flex">
            <div className='px-6 py-30 lg:w-1/4'>
                <img src={movie.poster_url} className='h-[400px] w-full object-cover' alt={movie.name} />
                <div>
                    <h2 className='text-2xl font-bold'>{movie.name}</h2>
                    <h3 className='text-white text-sm font-bold mt-4'>Giới thiệu:</h3>
                    <p className='text-gray-400 text-sm mt-2'>{movie.content}</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-30 flex-1">
                <div className='flex items-center gap-6'>
                    <button 
                        onClick={() => navigate(`/play-movie/${movie.slug}`)}
                        className='bg-gradient-to-r from-amber-200 to-yellow-400 text-black px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg cursor-pointer hover:shadow-amber-300/50 hover:shadow-xl transition-all duration-300'
                    >
                        <FaPlay />Xem ngay
                    </button>
                    <div className='cursor-pointer hover:text-amber-300 transition-all duration-300 flex items-center gap-2'>
                        <FaHeart className="text-center" /> 
                        <span>Yêu thích</span>
                    </div>
                    <div className='cursor-pointer hover:text-amber-300 transition-all duration-300 flex items-center gap-2'>
                        <FaPlus className="text-center" />
                        <span>Thêm vào</span>
                    </div>
                    <div className='cursor-pointer hover:text-amber-300 transition-all duration-300 flex items-center gap-2'>
                        <MdAttachMoney className="text-center" />
                        <span>Thuê Phim</span>
                    </div>
                </div>

                <Box sx={{ width: '100%', marginTop: '20px' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs 
                            value={value} 
                            onChange={handleChange} 
                            aria-label="movie detail tabs"
                            sx={{
                                '& .MuiTab-root': {
                                    color: 'white',
                                    '&.Mui-selected': {
                                        color: '#3b82f6',
                                    },
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#3b82f6',
                                },
                            }}
                        >
                            <Tab label="Tập phim" {...a11yProps(0)} />
                            <Tab label="Thông tin" {...a11yProps(1)} />
                            <Tab label="Trailer" {...a11yProps(2)} />
                        </Tabs>
                    </Box>

                    <CustomTabPanel value={value} index={0}>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">Các bản chiếu</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                                {episodes && episodes.map((server, index) => (
                                    <div key={index} className="bg-gray-800 p-4 rounded-lg">
                                        <h4 className="text-lg font-medium mb-2">{server.server_name}</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {server.server_data && server.server_data.map((episode, epIndex) => (
                                                <button
                                                    key={epIndex}
                                                    onClick={() => navigate(`/play-movie/${movie.slug}?ep=${episode.slug}`)}
                                                    className="bg-gray-700 hover:bg-gray-600 p-2 rounded text-sm transition-colors"
                                                >
                                                    {episode.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={1}>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Thông tin phim</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-semibold">Tên gốc:</span> {movie.origin_name}</p>
                                        <p><span className="font-semibold">Thời lượng:</span> {movie.time}</p>
                                        <p><span className="font-semibold">Năm phát hành:</span> {movie.year}</p>
                                        <p><span className="font-semibold">Thể loại:</span> {movie.category?.map(cat => cat.name).join(', ')}</p>
                                        <p><span className="font-semibold">Quốc gia:</span> {movie.country?.map(c => c.name).join(', ')}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Thông tin khác</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-semibold">Diễn viên:</span> {movie.actor?.join(', ')}</p>
                                        <p><span className="font-semibold">Đạo diễn:</span> {movie.director?.join(', ')}</p>
                                        <p><span className="font-semibold">Chất lượng:</span> {movie.quality}</p>
                                        <p><span className="font-semibold">Ngôn ngữ:</span> {movie.lang}</p>
                                        <p><span className="font-semibold">Trạng thái:</span> {movie.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={2}>
                        <div className="flex justify-center items-center">
                            {movie.trailer_url ? (
                                <iframe 
                                    src={movie.trailer_url}
                                    title="Trailer"
                                    width="100%"
                                    height="400px"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <p className="text-gray-400">Chưa có trailer</p>
                            )}
                        </div>
                    </CustomTabPanel>
                </Box>
            </div>
        </div>
    );
}

export default MovieDetail;