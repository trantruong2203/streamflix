
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './StyleSlideShow.css';



// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

function SlideShow(props) {
    const slides = [
        {
            src: "https://static.nutscdn.com/vimg/400-0/410b84049d5cf7c867d1f1b1c6fd05c3.jpg",
            title: "Khám Phá Thế Giới",
            description: "Hành trình khám phá những điều kỳ diệu của thiên nhiên hoang dã",
            buttonText: "Khám Phá Ngay",
            buttonColor: "primary"
        },
        {
            src: "https://static.nutscdn.com/vimg/400-0/5863776901bf0263f5b0f4f0c62c2660.jpg",
            title: "Sắc Màu Tự Nhiên",
            description: "Chiêm ngưỡng vẻ đẹp muôn màu của các loài chim trong tự nhiên",
            buttonText: "Xem Thêm",
            buttonColor: "success"
        },
        {
            src: "https://static.nutscdn.com/vimg/400-0/6ffa18ee06bac357526c9f3368c0208b.jpg",
            title: "Bí Ẩn Đêm Tối",
            description: "Khám phá thế giới bí ẩn của những sinh vật sống về đêm",
            buttonText: "Tìm Hiểu",
            buttonColor: "info"
        },
        {
            src: "https://static.nutscdn.com/vimg/400-0/6ba6bbc62fc5a30a5fd8cc41491f9476.jpg",
            title: "Vũ Điệu Của Sắc Màu",
            description: "Ngắm nhìn vẻ đẹp tuyệt mỹ của những cánh bướm rực rỡ",
            buttonText: "Chiêm Ngưỡng",
            buttonColor: "warning"
        },
        {
            src: "https://static.nutscdn.com/vimg/400-0/abbec361ba397a8d08e25c6b1edf1586.jpg",
            title: "Cuộc Sống Hoang Dã",
            description: "Khám phá cuộc sống của các loài động vật hoang dã trong tự nhiên",
            buttonText: "Khám Phá Ngay",
            buttonColor: "danger"
        },
        {
            src: "https://static.nutscdn.com/vimg/400-0/c9b5953acd44afb878103a64e2a30d58.jpg",
            title: "Thế Giới Động Vật",
            description: "Khám phá thế giới động vật đa dạng và phong phú",
            buttonText: "Tìm Hiểu Thêm",
            buttonColor: "secondary"
        }
    ];

    return (

        <>
            <div className='px-6 mt-3 flex flex-col md:flex-row gap-5'>
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
                    className="mySwiper md:flex-1 "
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.src} className='flex flex-col'>
                            <Link to="/detail/moviedetail" className="slide h-[200px] w-full rounded-lg overflow-hidden relative hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg">
                                <img src={slide.src} alt={slide.title} />
                            </Link>
                            <div className=' text-white p-4'>
                                <h3 className='text-md font-mono hover:text-yellow-500 cursor-pointer'>{slide.title}</h3>
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>



        </>

    );
}

export default SlideShow;