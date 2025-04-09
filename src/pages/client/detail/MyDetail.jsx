import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { MoviesContext } from '../../../context/MoviesProvider';
import { useContext } from 'react';
import { getOjectById } from '../../../services/FunctionRepon';
import { ContextCategories } from '../../../context/CategoriesProvider';
import { ActorContext } from '../../../context/ActorProvide';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHeart, FaPlay, FaPlus } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { EpisodesContext } from '../../../context/EpisodesProvider';
import { TrailersContext } from '../../../context/TrailerProvider';
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

function MyDetail() {
    const [value, setValue] = React.useState(0);
    const movies = useContext(MoviesContext);
    const episodes = useContext(EpisodesContext);
    const trailers = useContext(TrailersContext);
    const categories = useContext(ContextCategories);
    const actors = useContext(ActorContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Lấy thông tin phim từ URL
    const movie = movies.find(m => m.id === id);
    const trailer = trailers.find(t => t.idMovie === id);

    if (!movie) {
        return <div className="text-white text-center py-8">Không tìm thấy thông tin phim</div>;
    }

    return (
        <div className="bg-gray-900 text-white flex">
            <div className='px-6 py-30 w-1/4'>
            <div>
                <img src={movie.imgUrl} className='h-full w-full object-cover ' alt="" />
            </div>
                <div className='mt-4'>
                    <h2 className='text-2xl font-bold'>{movie.name}</h2>
                    <h3 className='text-white text-sm font-bold mt-4'>Giới thiệu :</h3>
                    <p className='text-gray-400 text-sm mt-2'>{movie.description}</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-30 flex-1">
                <div className='flex items-center gap-6'>
                    <button type="button" onClick={() => navigate(`/play-my-movie/${id}`)} className='bg-gradient-to-r from-amber-200 to-yellow-400 text-black px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg cursor-pointer hover:shadow-amber-300/50 hover:shadow-xl transition-all duration-300'><FaPlay />Xem ngay</button>
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
                            <Tab label="Diễn viên" {...a11yProps(1)} />
                            <Tab label="Danh mục" {...a11yProps(2)} />
                            <Tab label="Trailer" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">Các bản chiếu</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {episodes
                                    .filter(episode => episode.idMovie === movie.id)
                                    .map((episode) => (
                                        <div 
                                            key={episode.id} 
                                            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                                            onClick={() => window.open(episode.episodesUrl, '_blank')}
                                        >
                                            <div className="text-center">
                                                <h3 className="text-lg font-medium mb-2">Tập {episode.episodesNumber}</h3>
                                                <button className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white px-4 py-2 rounded-full transition-colors">
                                                    Xem ngay
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {movie.listActor?.map((actorId) => {
                                const actor = getOjectById(actors, actorId);
                                return actor ? (
                                    <div key={actorId} className="text-center">
                                        <img 
                                            src={actor.imgUrl} 
                                            alt={actor.name}
                                            className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
                                        />
                                        <p className="font-medium">{actor.name}</p>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <div className="flex flex-wrap gap-2">
                            {movie.listCate?.map((categoryId) => {
                                const category = getOjectById(categories, categoryId);
                                return category ? (
                                    <span 
                                        key={categoryId}
                                        className="px-3 py-1 bg-blue-600 rounded-full text-sm"
                                    >
                                        {category.name}
                                    </span>
                                ) : null;
                            })}
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <div className="flex justify-center items-center">
                            <iframe 
                                src={trailers.find(t => t.idMovie === movie.id)?.trailerUrl} 
                                title="Trailer"
                                width="100%"
                                height="400px"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </CustomTabPanel>
                    

                </Box>
            </div>
        </div>
    );
}

export default MyDetail;