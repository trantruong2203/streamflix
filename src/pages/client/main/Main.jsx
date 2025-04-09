import React, { useContext } from 'react';
import { ContextCategories } from '../../../context/CategoriesProvider';
import { Link } from 'react-router-dom';
import SlideShow from '../slideshow/SlideShow';
import SlideShowRent from '../slideshow/SlideShowRent';
import SlideBanner from '../slideshow/SlideBanner';

function Main(props) {
    const categories = useContext(ContextCategories);

    const gradients = [
        'bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400',
        'bg-gradient-to-br from-purple-600 via-purple-500 to-pink-400',
        'bg-gradient-to-br from-orange-600 via-orange-500 to-red-400',
        'bg-gradient-to-br from-green-600 via-green-500 to-emerald-400',
        'bg-gradient-to-br from-yellow-600 via-yellow-500 to-amber-400',
        'bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-400',
        'bg-gradient-to-br from-pink-600 via-pink-500 to-rose-400',
        'bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-400',
        'bg-gradient-to-br from-violet-600 via-violet-500 to-purple-400',
        'bg-gradient-to-br from-rose-600 via-rose-500 to-pink-400'
    ];

    const getRandomGradient = () => {
        return gradients[Math.floor(Math.random() * gradients.length)];
    };

    return (
        <div className='px-4 sm:px-6 py-4 mx-auto'>
            <SlideBanner />
            
            {/* categories */}
            <div className='mt-6 px-4'>
                <h2 className='text-2xl font-bold text-white mb-4 flex items-center'>
                    <span className='bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent'>
                        Bạn muốn xem phim gì?
                    </span>
                </h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                    {categories.slice(0, 6).map((category) => (
                        <div
                            key={category.id}
                            className={`relative group w-full aspect-square ${getRandomGradient()} rounded-xl p-4 
                            flex flex-col justify-between text-white 
                            transform transition-all duration-300 
                            hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20
                            cursor-pointer overflow-hidden`}
                        >
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10">
                                <div className="font-bold text-lg mb-2">{category.name}</div>
                                <div className="text-sm opacity-90 group-hover:opacity-100 transition-all duration-300 
                                    flex items-center gap-1">
                                    Xem tất cả 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" 
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Link to="/main/categories" className='inline-block mt-6'>
                    <button className='bg-gradient-to-r from-gray-700 to-gray-600 text-white px-6 py-2.5 
                        rounded-lg font-semibold 
                        transform transition-all duration-300 
                        hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20
                        flex items-center gap-2'>
                        <span>+ 5 Thể Loại</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </Link>
            </div>
            {/* end categories */}

            {/* movies */}
            <div className='mt-8 space-y-8'>
                <div className='bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-xl'>
                    <SlideShow title="Phim Hàn Quốc Mới" />
                    <SlideShow title="Phim Trung Quốc Mới" />
                    <SlideShow title="Phim Mỹ Mới" />
                </div>
                <SlideShowRent />
            </div>
        </div>
    );
}

export default Main;