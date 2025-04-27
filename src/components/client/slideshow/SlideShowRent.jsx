import React, { useState, useRef, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, EffectFade, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-creative';
import { MoviesContext } from '../../../context/MoviesProvider';
import { ContextCategories } from '../../../context/CategoriesProvider';
import { filterMoviesByCategories, getOjectById } from '../../../services/FunctionRepon';
import { Link } from 'react-router-dom';
import { FaHeart, FaPlay } from 'react-icons/fa';
import { IoInformationCircle } from 'react-icons/io5';

function SlideShowRent(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const mainSwiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const movies = useContext(MoviesContext)
    const categories = useContext(ContextCategories)
    
    const handleThumbClick = (index) => {
        if (mainSwiperRef.current && mainSwiperRef.current.swiper) {
            mainSwiperRef.current.swiper.slideTo(index);
            setActiveIndex(index);
        }
    };

    const converDescription = (description) => {
        if (!description) return "";
        if (description.length > 350) {
           return description.slice(0, 350) + " ......";
        }
        return description;
    }

    // Tìm danh mục "Hành động (Action)" để lấy ID
    const actionCategory = categories.find(category => category.name === "Hành động");
    const actionCategoryId = actionCategory ? actionCategory.id : null;
    
    // Lọc phim theo danh mục Hành động
    const actionMovies = actionCategoryId 
        ? filterMoviesByCategories(movies, categories, [actionCategoryId])
        : [];
    
    // Nếu không có phim hành động, lấy tất cả phim
    const displayMovies = actionMovies.length > 0 ? actionMovies : movies;

    return (
        <div className="w-full relative">
            {displayMovies.length > 0 ? (
                <>
                    <Swiper
                        ref={mainSwiperRef}
                        style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff',
                        }}
                        spaceBetween={0}
                        navigation={true}
                        effect="creative"
                        creativeEffect={{
                            prev: {
                                translate: ['-120%', 0, -500],
                            },
                            next: {
                                translate: ['120%', 0, -500],
                            },
                        }}
                        modules={[Navigation, Thumbs, EffectFade, EffectCreative]}
                        thumbs={{ swiper: thumbsSwiper }}
                        className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[100vh] mb-2.5 relative"
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    >
                        {
                            displayMovies.map((e, index) => (
                                <SwiperSlide key={index} className="relative">
                                    <img 
                                        src={e.imgBanner || e.imgUrl || 'https://via.placeholder.com/1920x1080'} 
                                        alt={e.name || 'Phim'} 
                                        className="w-full h-full object-cover" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
                                        <div className="absolute left-4 sm:left-8 md:left-12 lg:left-20 top-1/4 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[30%] z-1 text-white space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 p-4 sm:p-0">
                                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold line-clamp-2">{e.name || 'Phim không có tên'}</h1>
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
                                                <span className="px-2 py-1 bg-yellow-500 text-black font-bold rounded text-xs sm:text-sm">IMDb {e.rating || "6.6"}</span>
                                                <span className="px-2 py-1 border border-white rounded text-xs sm:text-sm">T16</span>
                                                <span className="text-xs sm:text-sm">{e.duration ? `${e.duration} m` : "1h 50m"}</span>
                                                <span className="text-xs sm:text-sm">{e.year || "2025"}</span>
                                            </div>
                                            <p className="text-xs sm:text-sm font-light leading-relaxed hidden sm:block">{converDescription(e.description)}</p>
                                            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                                                <Link to={`/main/movies/detail/${e.id}`} className="bg-gradient-to-tr from-yellow-200 to-amber-50 p-4 text-black rounded-full font-bold   hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] transition text-xs sm:text-sm md:text-base">
                                                <FaPlay className='text-2xl text-center' />
                                                </Link>
                                                <div className='flex flex-wrap gap-2 px-6 py-2.5 rounded-full items-center justify-center border border-gray-300 hover:border-white/50 hover:bg-white/10 transition-all duration-300 cursor-pointer sm:gap-3 md:gap-4'>
                                                <FaHeart className='text-2xl text-center border-r-2 border-gray-300 mr-2 pr-2 hover:text-red-500 transition-colors duration-300' />
                                                <IoInformationCircle className='text-2xl text-center hover:text-blue-400 transition-colors duration-300' />
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4">
                                                {Array.isArray(e.listCate) && e.listCate.slice(0, 3).map((listCateId, i) => {
                                                    const category = getOjectById(categories, listCateId);
                                                    return category ? (
                                                        <span key={i} className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 rounded-full hover:bg-white/30 cursor-pointer">
                                                            {category.name}
                                                        </span>
                                                    ) : null;
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={2.5}
                        breakpoints={{
                            640: {
                                slidesPerView: 3.5,
                            },
                            768: {
                                slidesPerView: 4.5,
                            },
                            1024: {
                                slidesPerView: 6,
                            },
                        }}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[Navigation, Thumbs]}
                        className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[600px] h-[60px] sm:h-[80px] md:h-[100px] absolute bottom-4 sm:bottom-8 md:bottom-16 lg:bottom-40 left-[5%] sm:left-[10%] md:left-[15%] lg:left-1/4 z-10"
                    >
                        {
                            displayMovies.map((e, index) => (
                                <SwiperSlide 
                                    key={index}
                                    className={`cursor-pointer transition-all duration-300 rounded-lg overflow-hidden 
                                        ${activeIndex === index ? 'border-2 border-yellow-500' : 'border-2 border-transparent'}`} 
                                    onClick={() => handleThumbClick(index)}
                                >
                                    <img 
                                        src={e.imgUrl || e.imgBanner || 'https://via.placeholder.com/300x200'} 
                                        alt={`thumb ${index + 1}`} 
                                        className="w-full h-full object-cover" 
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </>
            ) : (
                <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] flex items-center justify-center bg-gray-900 text-white">
                    <p className="text-xl">Không có phim nào để hiển thị</p>
                </div>
            )}
        </div>
    );
}

export default SlideShowRent;
