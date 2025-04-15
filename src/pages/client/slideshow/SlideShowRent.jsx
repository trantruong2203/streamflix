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
import { filterMoviesByCategories } from '../../../services/FunctionRepon';
import { Link } from 'react-router-dom';

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

    // Tìm danh mục "Hành động (Action)" để lấy ID
    const actionCategory = categories.find(category => category.name === "Hành động (Action)");
    const actionCategoryId = actionCategory ? actionCategory.id : null;
    
    // Lọc phim theo danh mục Hành động
    const actionMovies = actionCategoryId 
        ? filterMoviesByCategories(movies, categories, [actionCategoryId])
        : [];

    return (
        <div className="w-full relative">
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
                className="w-full h-[80vh] mb-2.5 relative"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {
                    actionMovies.map((e, index) => (
                        <SwiperSlide key={index} className="relative">
                            <img src={e.imgBanner} alt={e.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
                                <div className="absolute left-20 top-1/4 w-1/2 text-white space-y-6">
                                    <h1 className="text-5xl font-bold">{e.name}</h1>
                                    <div className="flex items-center gap-4">
                                        <span className="px-2 py-1 bg-yellow-500 text-black font-bold rounded">IMDb {e.rating || "6.6"}</span>
                                        <span className="px-2 py-1 border border-white rounded">T16</span>
                                        <span>{e.duration || "1h 50m"}</span>
                                        <span>{e.year || "2025"}</span>
                                    </div>
                                    <p className="text-lg leading-relaxed">{e.description}</p>
                                    <div className="flex gap-4">
                                        <Link to={`/main/movies/detail/${e.id}`} className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition">
                                            Xem Phim
                                        </Link>
                                        <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-bold hover:bg-white/30 transition">
                                            Chi Tiết
                                        </button>
                                    </div>
                                    <div className="flex gap-4 mt-4">
                                        {["Hành Động", "Chiếu Rạp", "Gay Cấn", "Kinh Dị", "Hài"].map((tag, i) => (
                                            <span key={i} className="text-sm px-3 py-1 bg-white/20 rounded-full hover:bg-white/30 cursor-pointer">
                                                {tag}
                                            </span>
                                        ))}
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
                slidesPerView={6}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="w-[600px] h-[100px] absolute bottom-10 left-20 z-10"
            >
                {
                    actionMovies.map((e, index) => (
                        <SwiperSlide 
                            key={index}
                            className={`cursor-pointer transition-all duration-300 rounded-lg overflow-hidden
                                ${activeIndex === index ? 'border-2 border-yellow-500' : 'border-2 border-transparent'}`} 
                            onClick={() => handleThumbClick(index)}
                        >
                            <img src={e.imgUrl} alt={`thumb ${index + 1}`} className="w-full h-full object-cover" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

export default SlideShowRent;