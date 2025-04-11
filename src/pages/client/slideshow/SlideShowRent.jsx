import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './SlideShowRent.css';

function SlideShowRent(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="gallery-container">
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                className="main-swiper"
            >
                <SwiperSlide>
                    <img src="https://picsum.photos/800/400?random=1" alt="slide 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://picsum.photos/800/400?random=2" alt="slide 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://picsum.photos/800/400?random=3" alt="slide 3" />
                </SwiperSlide>
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="thumbs-swiper"
            >
                <SwiperSlide>
                    <img src="https://picsum.photos/800/400?random=1" alt="thumb 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://picsum.photos/800/400?random=2" alt="thumb 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://picsum.photos/800/400?random=3" alt="thumb 3" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default SlideShowRent;