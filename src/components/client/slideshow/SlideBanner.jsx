import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Button } from "@mui/material";
import { PlayArrow, Info } from "@mui/icons-material";
import image1 from "../../../assets/avengers_endgame_ver3_xlg.jpg";
import image2 from "../../../assets/breaking_bad_ver6_xlg.jpg";
import image3 from "../../../assets/inception_ver4_xlg.jpg";

function SlideBanner(props) {
    const slides = [
        {
            image: image1,
            title: "Phim Mới Nhất",
            description: "Khám phá bộ sưu tập phim mới nhất với chất lượng cao",
            movieTitle: "Avengers: Endgame",
            rating: "9.5/10"
        },
        {
            image: image2,
            title: "Phim Bộ Hấp Dẫn",
            description: "Xem các bộ phim truyền hình hay nhất mọi thời đại",
            movieTitle: "Breaking Bad",
            rating: "9.8/10"
        },
        {
            image: image3,
            title: "Phim Chiếu Rạp",
            description: "Cập nhật liên tục các bộ phim chiếu rạp mới nhất",
            movieTitle: "Inception",
            rating: "9.3/10"
        },
    ];

    return (
        <div className="relative ">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-[100vh]">
                            <img 
                                className="w-full h-[100vh] object-cover" 
                                src={slide.image} 
                                alt={`Slide ${index + 1}`} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
                                <div className="absolute left-10 top-1/2 transform -translate-y-1/2 text-white max-w-2xl">
                                    <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                                    <p className="text-xl mb-6">{slide.description}</p>
                                    <div className="mb-8">
                                        <h3 className="text-3xl font-bold mb-2">{slide.movieTitle}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                                                {slide.rating}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button 
                                            variant="contained" 
                                            size="large"
                                            startIcon={<PlayArrow />}
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            Xem Ngay
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            size="large"
                                            startIcon={<Info />}
                                            className="text-white border-white hover:bg-white/10"
                                        >
                                            Thông Tin
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
        </div>
    );
}

export default SlideBanner;