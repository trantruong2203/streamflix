import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { MoviesContext } from '../../../context/MoviesProvider';
import { useContext } from 'react';
import { checkFavoriteMovie, checkMovieList, getFavoriteMovie, getOjectById, moviesList } from '../../../services/FunctionRepon';
import { ContextCategories } from '../../../context/CategoriesProvider';
import { ActorContext } from '../../../context/ActorProvide';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaHeart, FaPlay, FaPlus } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { EpisodesContext } from '../../../context/EpisodesProvider';
import { TrailersContext } from '../../../context/TrailerProvider';
import { ContextAuth } from '../../../context/AuthProvider';
import { PlansContext } from '../../../context/PlansProvider';
import { checkVipEligibility, handleClick } from '../../../services/FunctionPlayMovie';
import { useNotification } from '../../../context/NotificationProvide';
import Login from '../../../components/client/Login';
import { useState } from 'react';
import { RentMoviesContext } from '../../../context/RentMoviesProvider';
import { addDocument } from '../../../services/firebaseService';
import { FavoritesContext } from '../../../context/FavoritesProvider';
import { MovieListContext } from '../../../context/MovieListProvider';
import Comment from '../../../components/client/Comment/Comment';
import { Rating, Typography } from '@mui/material';

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
    const [value, setValue] = useState(0);
    const [openLogin, setOpenLogin] = useState(false);
    const movies = useContext(MoviesContext);
    const episodes = useContext(EpisodesContext);
    const trailers = useContext(TrailersContext);
    const categories = useContext(ContextCategories);
    const actors = useContext(ActorContext);
    const { accountLogin } = useContext(ContextAuth);
    const plans = useContext(PlansContext);
    const notification = useNotification();
    const { id } = useParams();
    const navigate = useNavigate();
    const rentMovies = useContext(RentMoviesContext);
    const favorites = useContext(FavoritesContext);
    const list = useContext(MovieListContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpenLogin = () => {
        setOpenLogin(true);
    };

    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    // Lấy thông tin phim từ URL
    const movie = movies.find(m => m.id === id);
    const trailer = trailers.find(t => t.idMovie === id);

    if (!movie) {
        return <div className="text-white text-center py-8 text-xl font-semibold">Không tìm thấy thông tin phim</div>;
    }

    const checkMovie = () => {
        if (!accountLogin) return false;
        const level = getOjectById(plans, movie.planId)?.level;
        return checkMovieRent(movie) || checkLevel(level);
    }

    const checkLevel = (level) => {
        if (level < 3) {
            return true;
        } else {
            return false;
        }
    }

    const checkMovieRent = (movie) => {
        if (!accountLogin) return false;

        const a = checkVipEligibility(accountLogin, plans, movies);
        const rentedMovie = rentMovies.find(rent => rent.movieId === movie.id && rent.idUser === accountLogin.id && rent.expiryDate.toDate() > new Date());
        return rentedMovie || a ? true : false;
    }




    return (
        <div className="min-h-screen bg-gray-900">
            <div className="relative">
                <img
                    src={movie.imgBanner}
                    className='h-[80vh] w-full object-cover filter brightness-50'
                    alt={movie.name}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900"></div>
            </div>
            <div className="container mx-auto px-20 py-8">
                <div className="flex flex-col md:flex-row gap-15">
                    {/* Phần thông tin phim bên trái */}
                    <div className="w-full md:w-1/4 space-y-6">
                        <div className="rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-105">
                            <img
                                src={movie.imgUrl}
                                className='w-full h-auto object-cover aspect-[2/3]'
                                alt={movie.name}
                            />
                        </div>
                        <div className="space-y-4">
                            <h2 className='text-3xl font-bold text-white'>{movie.name}</h2>
                            <div>
                                <h3 className='text-white text-lg font-semibold mb-2'>Giới thiệu:</h3>
                                <p className='text-gray-300 text-sm leading-relaxed'>{movie.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Phần nội dung chính bên phải */}
                    <div className="flex-1 space-y-8">
                        {/* Các nút tương tác */}
                        <div className='flex justify-between'>
                            <div className='flex flex-wrap items-center gap-4'>
                                <button
                                    type="button"
                                    onClick={() => handleClick(movie, accountLogin, plans, navigate, notification)}
                                    className='bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg hover:shadow-amber-300/50 hover:shadow-xl transition-all duration-300 hover:scale-105'
                                >
                                    <FaPlay className="text-lg" />
                                    <span>Xem ngay</span>
                                </button>
                                <div onClick={() => getFavoriteMovie(accountLogin, movie, favorites, notification)} className='cursor-pointer text-white hover:text-amber-300 transition-all duration-300 flex items-center gap-2 group'>
                                    {checkFavoriteMovie(accountLogin, movie, favorites) ?
                                        <>
                                            <FaHeart className="text-xl text-red-600 group-hover:scale-110 transition-transform" />
                                            <span>Bỏ Yêu thích</span>
                                        </> : <>
                                            <FaHeart className="text-xl group-hover:scale-110 transition-transform" />
                                            <span>Yêu thích</span>
                                        </>}
                                </div>

                                <div
                                    onClick={() => moviesList(accountLogin, movie, list, notification)}
                                    className='cursor-pointer text-white 
                            hover:text-amber-300 transition-all duration-300 flex items-center gap-2 group'>
                                    {checkMovieList(accountLogin, movie, list)
                                        ? <>
                                            <FaPlus className="text-xl text-yellow-400 group-hover:scale-110 transition-transform" />
                                            <span>Bỏ Thêm vào</span>
                                        </>
                                        : <>
                                            <FaPlus className="text-xl group-hover:scale-110 transition-transform" />
                                            <span>Thêm vào</span>
                                        </>
                                    }

                                </div>
                                {!checkMovie() ? (
                                    <Link
                                        to={`/payment/rent-movie/${movie.id}`}
                                        className='cursor-pointer text-white hover:text-amber-300 transition-all duration-300 flex items-center gap-2 group'
                                    >

                                        <div className='flex items-center gap-2'>{accountLogin ? <><MdAttachMoney className="text-xl group-hover:scale-110 transition-transform" /> Thuê Phim</> : ""}</div>
                                    </Link>
                                ) : ("")}
                            </div>

                            <div>
                                <Typography component="legend" className='text-white'>Đánh giá</Typography>
                                <Rating 
                                    name="customized-10" 
                                    defaultValue={0} 
                                    max={10}
                                    readOnly
                                    sx={{
                                        '& .MuiRating-iconFilled': {
                                            color: '#fbbf24',
                                        },
                                        '& .MuiRating-iconHover': {
                                            color: '#f59e0b',
                                        },
                                        '& .MuiRating-iconEmpty': {
                                            color: '#ffffff',
                                        },
                                    }}
                                />
                                

                            </div>
                        </div>



                        {/* Tabs */}
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                '& .MuiTab-root': {
                                    color: 'white',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    '&.Mui-selected': {
                                        color: '#fbbf24',
                                    },
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#fbbf24',
                                },
                            }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="movie detail tabs"
                                >
                                    <Tab label="Tập phim" {...a11yProps(0)} />
                                    <Tab label="Diễn viên" {...a11yProps(1)} />
                                    <Tab label="Danh mục" {...a11yProps(2)} />
                                    <Tab label="Trailer" {...a11yProps(3)} />
                                </Tabs>
                            </Box>

                            {/* Tab content */}
                            <CustomTabPanel value={value} index={0}>
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-white">Các tập phim</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {episodes
                                            .filter(episode => episode.idMovie === movie.id)
                                            .sort((a, b) => a.episodesNumber - b.episodesNumber)
                                            .map((episode) => (
                                                <div
                                                    key={episode.id}
                                                    className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg"
                                                    onClick={() => handleClick(movie, accountLogin, plans, navigate)}
                                                >
                                                    <div className="text-center space-y-4">
                                                        <h3 className="text-xl font-medium text-white">Tập {episode.episodesNumber}</h3>
                                                        <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full transition-colors duration-300 w-full">
                                                            Xem ngay
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={1}>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                    {movie.listActor?.map((actorId) => {
                                        const actor = getOjectById(actors, actorId);
                                        return actor ? (
                                            <div
                                                key={actorId}
                                                className="text-center group"
                                            >
                                                <div className="relative overflow-hidden rounded-full w-24 h-24 mx-auto mb-3">
                                                    <img
                                                        src={actor.imgUrl}
                                                        alt={actor.name}
                                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <p className="font-medium text-white group-hover:text-amber-300 transition-colors">{actor.name}</p>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={2}>
                                <div className="flex flex-wrap gap-3">
                                    {movie.listCate?.map((categoryId) => {
                                        const category = getOjectById(categories, categoryId);
                                        return category ? (
                                            <span
                                                key={categoryId}
                                                className="px-4 py-2 bg-amber-500 text-black rounded-full text-sm font-medium hover:bg-amber-400 transition-colors duration-300"
                                            >
                                                {category.name}
                                            </span>
                                        ) : null;
                                    })}
                                </div>
                            </CustomTabPanel>

                            <CustomTabPanel value={value} index={3}>
                                <div className="flex justify-center items-center rounded-xl overflow-hidden shadow-2xl">
                                    <iframe
                                        src={trailer?.trailerUrl}
                                        title="Trailer"
                                        className="w-full aspect-video"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </CustomTabPanel>
                        </Box>

                        <Comment />
                    </div>
                </div>
            </div>
            <Login open={openLogin} handleClose={handleCloseLogin} />
        </div>
    );
}

export default MyDetail;