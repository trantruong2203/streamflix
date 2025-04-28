import React, { useContext, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { MoviesContext } from '../../../context/MoviesProvider';
import { PlansContext } from '../../../context/PlansProvider';
import { filterMovieByPlan } from '../../../services/FunctionRepon';

function SlideShow(props) {
    const movies = useContext(MoviesContext);
    const plans = useContext(PlansContext);
   
    return (
        <>
            <div className='px-3 sm:px-4 md:px-6 mt-2 sm:mt-3 flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-5'>
                <div className='p-2 sm:p-3 flex flex-col gap-1 sm:gap-2 justify-center items-start w-full md:w-[200px] lg:w-[250px]'>
                    {props.title && <h2 className='font-semibold text-xl sm:text-2xl md:text-3xl text-blue-200'>{props.title}</h2>}
                    <p className='text-sm sm:text-base text-blue-200'>Xem toàn bộ </p>
                </div>
                <Swiper
                    slidesPerView={3}
                    breakpoints={{
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 5,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                    spaceBetween={10}
                    modules={[Pagination]}
                    className="mySwiper md:flex-1 w-full h-full"
                >
                    {filterMovieByPlan(movies,plans,4).map((slide) => (
                        <SwiperSlide key={slide.id} className='flex flex-col text-center text-lg'>
                            <Link to={`/main/movies/detail/${slide.id}`} className="block h-[300px] sm:h-[300px] md:h-[300px] lg:h-[400px] w-full rounded-lg overflow-hidden relative group">
                                <img 
                                    src={slide.imgUrl || slide.imgUrl || 'https://via.placeholder.com/1920x1080'} 
                                    alt={slide.name} 
                                    className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl" 
                                />
                            </Link>
                            <div className='text-white p-2 sm:p-3 md:p-4'>
                                <h3 className='text-sm sm:text-md font-mono hover:text-yellow-500 cursor-pointer transition-colors duration-300 truncate'>{slide.name}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}

export default SlideShow;
