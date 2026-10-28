import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { MoviesContext } from '../../../context/MoviesProvider';
import { PlansContext } from '../../../context/PlansProvider';
import { filterMovieByPlan, getOjectById } from '../../../services/FunctionRepon';

function SlideShowVip(props) {
    const movies = useContext(MoviesContext);
    const plans = useContext(PlansContext);
    const vipMovies = filterMovieByPlan(movies, plans, 3);

    if (!vipMovies?.length) return null;

    return (
        <div className='px-2 sm:px-4 py-4 flex flex-col md:flex-row gap-4 border-b border-stone-800/80 pb-6 mt-4'>
            <div className='p-2 sm:p-3 flex flex-col gap-1 sm:gap-2 justify-center items-start w-full md:w-[220px] lg:w-[260px] flex-shrink-0'>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-stone-900 border border-amber-500/30 px-2 py-0.5 rounded">
                    PREMIUM TICKET
                </span>
                {props.title && (
                    <h2 className='font-bold text-xl sm:text-2xl md:text-3xl text-stone-100 font-serif tracking-tight'>
                        {props.title}
                    </h2>
                )}
                <p className='text-xs text-stone-400 font-mono'>Phim độc quyền dành cho thành viên VIP</p>
                <Link to="/main/vip" className='mt-2 inline-flex items-center text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors'>
                    Khám phá gói VIP →
                </Link>
            </div>
            <Swiper
                slidesPerView={2.2}
                breakpoints={{
                    480: {
                        slidesPerView: 2.5,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 12,
                    },
                    768: {
                        slidesPerView: 3.5,
                        spaceBetween: 14,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                    },
                }}
                spaceBetween={12}
                modules={[Pagination]}
                className="mySwiper md:flex-1 w-full h-full !py-2"
            >
                {vipMovies.map((slide) => {
                    const planTitle = getOjectById(plans, slide.planID)?.title;
                    return (
                        <SwiperSlide key={slide.id} className='flex flex-col text-left group cursor-pointer'>
                            <Link 
                                to={`/main/movies/detail/${slide.id}`} 
                                className="block h-[180px] sm:h-[200px] w-full rounded-md overflow-hidden relative border border-stone-800 group-hover:border-amber-500/60 shadow-lg group-hover:shadow-amber-500/10 transition-all duration-300 bg-stone-900"
                            >
                                <img 
                                    src={slide.imgBanner || slide.imgUrl || 'https://via.placeholder.com/600x350'} 
                                    alt={slide.name} 
                                    className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                                {planTitle && (
                                    <span className="absolute top-2 right-2 text-[10px] font-mono font-bold bg-amber-500 text-stone-950 px-2 py-0.5 rounded shadow">
                                        {planTitle}
                                    </span>
                                )}
                            </Link>
                            <div className='pt-2'>
                                <h3 className='text-xs sm:text-sm font-semibold text-stone-200 group-hover:text-amber-400 transition-colors duration-200 truncate'>
                                    {slide.name}
                                </h3>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

export default SlideShowVip;
