import React, { useContext } from 'react';
import { ContextCategories } from '../../../context/CategoriesProvider';
import { Link } from 'react-router-dom';
import { FaFilm, FaTicketAlt, FaFire, FaCompass, FaChevronRight } from 'react-icons/fa';
import SlideShow from '../../../components/client/slideshow/SlideShow';
import SlideShowRent from '../../../components/client/slideshow/SlideShowRent';
import SlideShowVip from '../../../components/client/slideshow/SlideShowVip';
import UsaMovies from '../../../components/client/slideshow/slideshow free/UsaMovies';
import KoreaMovies from '../../../components/client/slideshow/slideshow free/KoreaMovie';
import GenreMoviesExplorer from '../../../components/client/slideshow/GenreMoviesExplorer';
import MovieGenreRow from '../../../components/client/slideshow/MovieGenreRow';

function Main(props) {
    const categories = useContext(ContextCategories);

    return (
        <div className='w-full max-w-full px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 space-y-8'>
            {/* Top Hero Banner */}
            <div className="overflow-hidden rounded-xl border border-stone-800/90 shadow-2xl bg-stone-950">
                <SlideShowRent />
            </div>
            
            {/* Retro Cinema Marquee - Quick Categories Explorer */}
            <div className='px-1 sm:px-2'>
                <div className="flex items-center justify-between mb-3 border-b border-stone-800/80 pb-2">
                    <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                            <FaTicketAlt className="text-[9px]" />
                            GENRE DIRECTORY
                        </span>
                        <h2 className='text-xl sm:text-2xl font-bold text-stone-100 font-serif tracking-tight mt-0.5'>
                            Bạn muốn thưởng thức thể loại nào?
                        </h2>
                    </div>

                    <Link 
                        to="/main/categories" 
                        className='hidden sm:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors'
                    >
                        <span>Tất cả thể loại</span>
                        <FaChevronRight className="text-[9px]" />
                    </Link>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3'>
                    {categories.slice(0, 6).map((category, idx) => (
                        <Link 
                            key={category.id || idx}
                            to={`/main/movies/${category.id}`}
                            className="group relative bg-stone-900/90 hover:bg-stone-800/90 border border-stone-800 hover:border-amber-500/60 rounded-lg p-3.5 flex flex-col justify-between h-[90px] sm:h-[100px] transition-all duration-300 shadow-md hover:shadow-amber-500/10 cursor-pointer overflow-hidden"
                        >
                            {/* Subtle vintage corner ticket notch */}
                            <div className="absolute top-0 right-0 w-3 h-3 bg-stone-950 rounded-bl-md border-b border-l border-stone-800 group-hover:border-amber-500/50 transition-colors" />

                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono text-amber-400/80 group-hover:text-amber-400">
                                    0{idx + 1}
                                </span>
                                <FaFilm className="text-stone-600 group-hover:text-amber-500/70 transition-colors text-xs" />
                            </div>

                            <div>
                                <div className="font-semibold text-sm sm:text-base text-stone-200 group-hover:text-amber-300 transition-colors truncate">
                                    {category.name}
                                </div>
                                <div className="text-[10px] text-stone-400 font-mono flex items-center gap-1 opacity-80 group-hover:opacity-100">
                                    <span>Xem kho phim</span>
                                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-3 sm:hidden">
                    <Link 
                        to="/main/categories" 
                        className='inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300'
                    >
                        <span>Xem toàn bộ thể loại</span>
                        <FaChevronRight className="text-[9px]" />
                    </Link>
                </div>
            </div>

            {/* Core Interactive Genre Explorer: Fetches from /the-loai & /v1/api/the-loai/{slug} */}
            <GenreMoviesExplorer />

            {/* Main Cinema Vaults Container */}
            <div className='bg-stone-900/40 rounded-xl p-3 sm:p-5 md:p-6 border border-stone-800/80 shadow-2xl'>
                {/* Row 1: Phim Hành Động */}
                <MovieGenreRow 
                    genreSlug="hanh-dong"
                    title="Bom Tấn Hành Động & Kịch Tính"
                    subtitle="Pha rượt đuổi nghẹt thở và những màn đấu trí kịch tính"
                    badge="ACTION ARCHIVE"
                    limit={12}
                />

                {/* Row 2: Phim Kinh Điển */}
                <MovieGenreRow 
                    genreSlug="kinh-dien"
                    title="Tuyển Tập Phim Kinh Điển"
                    subtitle="Những kiệt tác điện ảnh bất hủ đoạt giải thưởng danh giá"
                    badge="TIMELESS MASTERPIECES"
                    limit={12}
                />

                {/* Exclusive StreamFlix / VIP Slideshows */}
                <div className="my-10 bg-stone-950/70 rounded-xl p-3 sm:p-5 border border-stone-800/90">
                    <SlideShow title="Phim Lẻ Mới Cập Nhật" />
                    <SlideShowVip title="Phim VIP Đặc Quyền" />
                </div>

                {/* Row 3: Phim Tình Cảm & Tâm Lý */}
                <MovieGenreRow 
                    genreSlug="tinh-cam"
                    title="Phim Tình Cảm & Lãng Mạn"
                    subtitle="Chạm đến từng cung bậc cảm xúc qua những thước phim sâu lắng"
                    badge="ROMANCE REEL"
                    limit={12}
                />

                {/* Row 4: Phim Viễn Tưởng & Thần Thoại */}
                <MovieGenreRow 
                    genreSlug="vien-tuong"
                    title="Khoa Học Viễn Tưởng & Vũ Trụ"
                    subtitle="Hành trình khám phá những thế giới kỳ ảo ngoài sức tưởng tượng"
                    badge="SCI-FI VAULT"
                    limit={12}
                />

                {/* Free International Cinema (Korea & USA) with unified Retro styling */}
                <div className='border-t border-stone-800/90 pt-8 mt-12'>
                    <div className='text-center mb-6'>
                        <span className='inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30'>
                            <span className='w-2 h-2 rounded-full bg-amber-500 animate-pulse'></span>
                            FREE CINEMA • ĐIỆN ẢNH MIỄN PHÍ
                        </span>
                        <h2 className='text-2xl sm:text-3xl font-bold text-stone-100 tracking-tight mt-2 font-serif sm:font-sans'>
                            Điện Ảnh Quốc Tế Chọn Lọc
                        </h2>
                        <p className='text-stone-400 text-xs sm:text-sm mt-1 max-w-lg mx-auto font-light'>
                            Trọn bộ phim Âu Mỹ và Hàn Quốc đặc sắc có phụ đề Vietsub chất lượng cao
                        </p>
                    </div>

                    <KoreaMovies />
                    <UsaMovies />
                </div>
            </div>
        </div>
    );
}

export default Main;
