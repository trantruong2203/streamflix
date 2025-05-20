import React, { useContext } from 'react';
import { ContextCategories } from '../../../context/CategoriesProvider';
import { Link } from 'react-router-dom';
import SlideShow from '../../../components/client/slideshow/SlideShow';
import SlideShowRent from '../../../components/client/slideshow/SlideShowRent';
import SlideBanner from '../../../components/client/slideshow/SlideBanner';
import SlideShowVip from '../../../components/client/slideshow/SlideShowVip';
import UsaMovies from '../../../components/client/slideshow/slideshow free/UsaMovies';
import KoreaMovies from '../../../components/client/slideshow/slideshow free/KoreaMovie';

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
        <div className='px-2 sm:px-4 md:px-6 sm:py-4 mx-auto max-w-full'>
            <div className="overflow-hidden rounded-lg">
                <SlideShowRent />
            </div>
            
            {/* categories */}
            <div className=' px-2'>
                <h2 className='text-xl font-bold text-white mb-3'>
                    <span className='bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent'>
                        Bạn muốn xem phim gì?
                    </span>
                </h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2'>
                    {categories.slice(0, 6).map((category) => (
                        <Link 
                            key={category.id}
                            to={`/main/movies/${category.id}`}
                            className={`relative group w-full aspect-square ${getRandomGradient()} rounded-lg px-6 py-1 
                            flex flex-col h-[100px] justify-center text-white 
                            transform transition-all duration-300 
                            hover:scale-105 hover:shadow-lg
                            cursor-pointer overflow-hidden`}
                        >
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10">
                                <div className="font-bold text-sm md:text-base">{category.name}</div>
                                <div className="text-xs opacity-90 group-hover:opacity-100 transition-all duration-300 
                                    flex items-center gap-1">
                                    Xem tất cả 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" 
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <Link to="/main/categories" className='inline-block mt-3'>
                    <button className='bg-gradient-to-r from-gray-700 to-gray-600 text-white px-4 py-2 
                        rounded-lg font-semibold text-sm
                        transform transition-all duration-300 
                        hover:scale-105 hover:shadow-lg
                        flex items-center gap-2'>
                        <span>+ 5 Thể Loại</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </Link>
            </div>
            {/* end categories */}

            {/* movies */}
            <div className='mt-6 sm:mt-8 lg:mt-10 space-y-6 sm:space-y-8 lg:space-y-10'>
                <div className='bg-bgmain rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-xl'>
                    <SlideShow title="Phim Lẻ Mới" />
                    <SlideShowVip title="Phim Vip Mới" className='mt-15' />
                    <h1 className='text-center text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent border-b-2 border-gray-700 pb-2 mb-4'>Phim Miễn Phí</h1>
                    <KoreaMovies />
                    <UsaMovies />
                    
                </div>
            </div>
        </div>
    );
}

export default Main;
