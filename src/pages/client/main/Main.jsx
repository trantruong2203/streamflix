
import React, { useContext } from 'react';
import { ContextCategories } from '../../../context/CategoriesProvider';
import { Link } from 'react-router-dom';
import SlideShow from '../slideshow/SlideShow';
import SlideShowRent from '../slideshow/SlideShowRent';
import SlideBanner from '../slideshow/SlideBanner';
function Main(props) {

    const categories = useContext(ContextCategories);

    const gradients = [
        'bg-gradient-to-r from-blue-500 to-cyan-500',
        'bg-gradient-to-r from-purple-500 to-pink-500',
        'bg-gradient-to-r from-orange-500 to-red-500',
        'bg-gradient-to-r from-green-500 to-emerald-500',
        'bg-gradient-to-r from-yellow-500 to-amber-500',
        'bg-gradient-to-r from-indigo-500 to-purple-500',
        'bg-gradient-to-r from-pink-500 to-rose-500',
        'bg-gradient-to-r from-teal-500 to-cyan-500',
        'bg-gradient-to-r from-violet-500 to-purple-500',
        'bg-gradient-to-r from-rose-500 to-pink-500'
    ];

    const getRandomGradient = () => {
        return gradients[Math.floor(Math.random() * gradients.length)];
    };
    return (
        <div className='px-6 py-3'>
            <SlideBanner />
            {/* categories */}
            <div className=' mt-3 text-2xl  font-bold text-white'>Bạn muốn xem phim gì?</div>
            <div>
                <div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-4 mt-3'>
                    {categories.slice(0, 6).map((category) => (
                        <div
                            key={category.id}
                            className={`w-[150px] md:w-[220px] h-[150px] p-4 ${getRandomGradient()} rounded-lg flex flex-col justify-between text-white hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg`}
                        >
                            <div className="font-semibold text-lg">{category.name}</div>
                            <div className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                                Xem tất cả →
                            </div>
                        </div>
                    ))}
                </div>
                <Link to="/main/categories" className='flex justify-start items-center mt-3'>
                    <button className='bg-gray-500 text-white  px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg'>
                        + 5 Thể Loại
                    </button>
                </Link>
            </div>
            {/* end categories */}

            {/* movies */}
            <SlideShow title="Phim Hàn Quốc Mới" />
            <SlideShow title="Phim Trung Quốc Mới" />
            <SlideShow title="Phim Mỹ Mới" />
            <SlideShowRent />
            {/* <div className='mt-3 w-full h-[500px]'>
                <iframe width="100%" height="100%" src="https://player.phimapi.com/player/?url=https://s4.phim1280.tv/20250325/fymMEt24/index.m3u8" frameborder="0" allowfullscreen></iframe>
            </div> */}
        </div>
    );
}

export default Main;