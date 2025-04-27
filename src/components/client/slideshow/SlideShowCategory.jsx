import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { ContextCategories } from '../../../context/CategoriesProvider';
import { useContext } from 'react';

function SlideShowCategory({ title = "Thể loại nổi bật" }) {
    const categories = useContext(ContextCategories);

    return (
        <div className='px-3 sm:px-4 md:px-6 mt-2 sm:mt-3 flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-5'>
            <div className='p-2 sm:p-3 flex flex-col gap-1 sm:gap-2 justify-center items-start w-full md:w-[200px] lg:w-[250px]'>
                {title && <h2 className='font-semibold text-xl sm:text-2xl md:text-3xl text-blue-200'>{title}</h2>}
                <p className='text-sm sm:text-base text-blue-200'>Xem toàn bộ </p>
            </div>
            <Swiper
                slidesPerView={3}
                breakpoints={{
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 25,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper md:flex-1 w-full h-full"
            >
                {categories && categories.map((cate) => (
                    <SwiperSlide key={cate.id} className='flex flex-col text-center text-lg'>
                        <Link to={`/main/movies/category/${cate.id}`} className="block h-[120px] sm:h-[150px] md:h-[180px] lg:h-[400px] w-full rounded-lg overflow-hidden relative group">
                            <img 
                                src={cate.imgBanner || 'https://via.placeholder.com/1920x1080'} 
                                alt={cate.name} 
                                className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl" 
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <FaPlay className="text-4xl text-white" />
                            </div>
                        </Link>
                        <div className='text-white p-2 sm:p-3 md:p-4'>
                            <h3 className='text-sm sm:text-md font-mono hover:text-yellow-500 cursor-pointer transition-colors duration-300 truncate'>{cate.name}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SlideShowCategory;