
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function KoreaMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://phimapi.com/v1/api/danh-sach/phim-le?page=1&limit=18&country=han-quoc&sort_field=year`);
                if (response.data.status === "success") {
                    setMovies(response.data.data.items);
                } else {
                    setError(response.data.msg || 'Không thể tải dữ liệu phim');
                }
            } catch (err) {
                setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

  return (
    <div className='mt-5'>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-purple-500 bg-clip-text text-transparent p-3">Phim Hàn Quốc Mới</h1>
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={0}        // Khoảng cách giữa các slide
      slidesPerView={6}         // 3 slides hiển thị cùng lúc
      navigation                // Nút điều hướng (prev/next)
      pagination={{ clickable: true }} // Chấm tròn chuyển trang
    >
        
        {movies.map((movie) => (
            <SwiperSlide key={movie._id} onClick={() => {
                navigate(`/movie/${movie.slug}`);
            }}
            className='cursor-pointer'
            >
                <div className="p-3 text-center rounded-lg ">
                    <img src={`https://phimimg.com/${movie.poster_url}`} alt={movie.name} className='rounded-lg w-full h-[300px]' />
                </div>
                <div className="p-2 text-white text-center">
                    <h3>{movie.name}</h3>
                </div>
            </SwiperSlide>
        ))}
    
    </Swiper>
    </div>
  );
}
