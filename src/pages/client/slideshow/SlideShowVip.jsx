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

function SlideShowVip(props) {
    const movies = useContext(MoviesContext);
    const plans = useContext(PlansContext);
   
    return (
        <>
            <div className='px-6 mt-3 flex flex-col md:flex-row gap-5 '>
                <div className='p-3 flex flex-col gap-2 justify-center items-start w-[250px]'>
                    {props.title && <h2 className='font-semibold text-3xl text-blue-200'>{props.title}</h2>}
                    <p className='text-blue-200'>Xem toàn bộ </p>
                </div>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper md:flex-1 w-full h-full"
                >
                    {filterMovieByPlan(movies,plans,3).map((slide) => (
                        <SwiperSlide key={slide.id} className='flex flex-col text-center text-lg'>
                            <Link to={`/main/movies/detail/${slide.id}`} className="block h-[200px] w-full rounded-lg overflow-hidden relative group">
                                <img 
                                    src={slide.imgUrl} 
                                    alt={slide.name} 
                                    className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl" 
                                />
                            </Link>
                            <div className='text-white p-4'>
                                <h3 className='text-md font-mono hover:text-yellow-500 cursor-pointer transition-colors duration-300'>{slide.name}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}

export default SlideShowVip;