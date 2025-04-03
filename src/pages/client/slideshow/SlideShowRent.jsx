import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./SlideShowRent.css";

const slides = [
    {
        id: 1,
        image: "https://static.nutscdn.com/vimg/400-0/f9197908357fe5ff6b4887a2752bf6ef.jpg",
        title: "Phim Hành Động",
        description: "Khám phá những bộ phim hành động gay cấn nhất"
    },
    {
        id: 2,
        image: "https://static.nutscdn.com/vimg/400-0/6a8bc3d402e4970e58bbb273d03bd8dd.jpg",
        title: "Phim Tình Cảm",
        description: "Những câu chuyện tình yêu lãng mạn"
    },
    {
        id: 3,
        image: "https://static.nutscdn.com/vimg/400-0/6001cdb554f395b4abcbb8adc87f8864.jpg",
        title: "Phim Khoa Học",
        description: "Khám phá thế giới khoa học viễn tưởng"
    },
    {
        id: 4,
        image: "https://static.nutscdn.com/vimg/400-0/115f115cce3883884c7e7854553acdce.jpg",
        title: "Phim Hài",
        description: "Những bộ phim hài hước nhất"
    },
    {
        id: 5,
        image: "https://static.nutscdn.com/vimg/400-0/c8d0fb4570e04422af77c8ddaca07e5b.jpg",
        title: "Phim Kinh Dị",
        description: "Trải nghiệm kinh hoàng với phim kinh dị"
    },
    {
        id: 6,
        image: "https://static.nutscdn.com/vimg/400-0/6a8bc3d402e4970e58bbb273d03bd8dd.jpg",
        title: "Phim Hoạt Hình",
        description: "Thế giới hoạt hình đầy màu sắc"
    },
    {
        id: 7,
        image: "https://static.nutscdn.com/vimg/400-0/6001cdb554f395b4abcbb8adc87f8864.jpg",
        title: "Phim Tài Liệu",
        description: "Khám phá thế giới qua phim tài liệu"
    }
];

function SlideShowRent() {
    const [isLoading, setIsLoading] = useState(true);
    const [slidesPerView, setSlidesPerView] = useState(5);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setSlidesPerView(1);
            } else if (window.innerWidth < 768) {
                setSlidesPerView(2);
            } else if (window.innerWidth < 1024) {
                setSlidesPerView(3);
            } else if (window.innerWidth < 1280) {
                setSlidesPerView(4);
            } else {
                setSlidesPerView(5);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="slideshow-container relative px-4 py-6">
            <div className="text-2xl font-bold text-white mb-6">
                Top 10 trong ngày
            </div>
            <div className="relative">
                <Swiper
                    slidesPerView={slidesPerView}
                    spaceBetween={20}
                    loop={true}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    pagination={{
                        clickable: true,
                        el: '.swiper-pagination',
                    }}
                    modules={[Navigation, Pagination, EffectFade, Autoplay]}
                    className="mySwiper"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <Link to="/detail/moviedetail" className="block">
                                <div className="slide h-[400px] w-full rounded-lg overflow-hidden relative -skew-6 hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg group">
                                    <img 
                                        src={slide.image} 
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                            <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                                            <p className="text-sm">{slide.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Nút điều hướng */}
                <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>

                {/* Dots pagination */}
                <div className="swiper-pagination absolute bottom-4 left-1/2 -translate-x-1/2 z-20"></div>
            </div>
        </div>
    );
}

export default SlideShowRent;