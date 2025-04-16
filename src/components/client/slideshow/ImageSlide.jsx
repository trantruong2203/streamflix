import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ImageSlide.css";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import { Button } from "@mui/material";

const slides = [
  {
    src: "/images/owl.jpg",
    title: "Khám Phá Thế Giới",
    description: "Hành trình khám phá những điều kỳ diệu của thiên nhiên hoang dã",
    buttonText: "Khám Phá Ngay",
    buttonColor: "primary"
  },
  {
    src: "/images/bird.jpg",
    title: "Sắc Màu Tự Nhiên",
    description: "Chiêm ngưỡng vẻ đẹp muôn màu của các loài chim trong tự nhiên",
    buttonText: "Xem Thêm",
    buttonColor: "success"
  },
  {
    src: "/images/raven.jpg",
    title: "Bí Ẩn Đêm Tối",
    description: "Khám phá thế giới bí ẩn của những sinh vật sống về đêm",
    buttonText: "Tìm Hiểu",
    buttonColor: "info"
  },
  {
    src: "/images/butterfly.jpg",
    title: "Vũ Điệu Của Sắc Màu",
    description: "Ngắm nhìn vẻ đẹp tuyệt mỹ của những cánh bướm rực rỡ",
    buttonText: "Chiêm Ngưỡng",
    buttonColor: "warning"
  }
];

function ImageSlide() {
  return (
    <div className="slider-container">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide.src} alt={slide.title} className="slide-img" />
            <div className="text-box">
              <h2><span className="highlight">{slide.title}</span></h2>
              <p>{slide.description}</p>
              <div className="buttons">
                <Button 
                  variant="contained" 
                  color={slide.buttonColor}
                  size="large"
                >
                  {slide.buttonText}
                </Button>
                <Button 
                  variant="outlined" 
                  color="inherit"
                  size="large"
                >
                  Đăng Ký
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageSlide;