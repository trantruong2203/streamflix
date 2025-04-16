import React, { useState, useEffect } from 'react';
import { searchMovies } from '../services/movieService';
import './MovieSearch.css';

const MovieSearch = () => {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    page: 1,
    sort_field: 'created_at',
    sort_type: 'desc',
    sort_lang: 'vi',
    category: '',
    country: '',
    year: '',
    rating: '',
    type: '',
    limit: 20
  });
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await searchMovies(searchParams);
      setMovies(response.data || []);
    } catch (err) {
      setError('Có lỗi xảy ra khi tìm kiếm phim');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchParams.page]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value,
      page: 1
    }));
  };

  return (
    <div className="movie-search">
      <div className="filter-section">
        <h3>Bộ lọc</h3>
        
        <div className="filter-group">
          <label>Quốc gia:</label>
          <div className="filter-options">
            <button className={searchParams.country === '' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'country', value: ''}})}>Tất cả</button>
            <button className={searchParams.country === 'us' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'country', value: 'us'}})}>Mỹ</button>
            <button className={searchParams.country === 'kr' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'country', value: 'kr'}})}>Hàn Quốc</button>
            <button className={searchParams.country === 'hk' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'country', value: 'hk'}})}>Hồng Kông</button>
            <button className={searchParams.country === 'jp' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'country', value: 'jp'}})}>Nhật Bản</button>
            <button className={searchParams.country === 'fr' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'country', value: 'fr'}})}>Pháp</button>
            <button className={searchParams.country === 'th' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'country', value: 'th'}})}>Thái Lan</button>
            <button className={searchParams.country === 'cn' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'country', value: 'cn'}})}>Trung Quốc</button>
            <button className={searchParams.country === 'other' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'country', value: 'other'}})}>Khác</button>
          </div>
        </div>

        <div className="filter-group">
          <label>Loại phim:</label>
          <div className="filter-options">
            <button className={searchParams.type === '' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'type', value: ''}})}>Tất cả</button>
            <button className={searchParams.type === 'movie' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'type', value: 'movie'}})}>Phim lẻ</button>
            <button className={searchParams.type === 'series' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'type', value: 'series'}})}>Phim bộ</button>
          </div>
        </div>

        <div className="filter-group">
          <label>Xếp hạng:</label>
          <div className="filter-options">
            <button className={searchParams.rating === '' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'rating', value: ''}})}>Tất cả</button>
            <button className={searchParams.rating === 'P' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'rating', value: 'P'}})}>P (Mọi lứa tuổi)</button>
            <button className={searchParams.rating === 'K' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'rating', value: 'K'}})}>K (Dưới 13 tuổi)</button>
            <button className={searchParams.rating === 'T13' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'rating', value: 'T13'}})}>T13 (13 tuổi trở lên)</button>
            <button className={searchParams.rating === 'T16' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'rating', value: 'T16'}})}>T16 (16 tuổi trở lên)</button>
            <button className={searchParams.rating === 'T18' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'rating', value: 'T18'}})}>T18 (18 tuổi trở lên)</button>
          </div>
        </div>

        <div className="filter-group">
          <label>Thể loại:</label>
          <div className="filter-options">
            <button className={searchParams.category === '' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'category', value: ''}})}>Tất cả</button>
            <button className={searchParams.category === 'anime' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'category', value: 'anime'}})}>Anime</button>
            <button className={searchParams.category === 'action' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'category', value: 'action'}})}>Chiến Tranh</button>
            <button className={searchParams.category === 'romance' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'category', value: 'romance'}})}>Tình Cảm</button>
            <button className={searchParams.category === 'comedy' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'category', value: 'comedy'}})}>Hài</button>
            <button className={searchParams.category === 'action' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'category', value: 'action'}})}>Hành Động</button>
            {/* Thêm các thể loại khác tương tự */}
          </div>
        </div>

        <div className="filter-group">
          <label>Năm sản xuất:</label>
          <div className="filter-options">
            <button className={searchParams.year === '' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'year', value: ''}})}>Tất cả</button>
            <button className={searchParams.year === '2025' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'year', value: '2025'}})}>2025</button>
            <button className={searchParams.year === '2024' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'year', value: '2024'}})}>2024</button>
            <button className={searchParams.year === '2023' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'year', value: '2023'}})}>2023</button>
            <button className={searchParams.year === '2022' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'year', value: '2022'}})}>2022</button>
            <button className={searchParams.year === '2021' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'year', value: '2021'}})}>2021</button>
            <button className={searchParams.year === 'older' ? 'active' : ''} onClick={() => handleInputChange({target: {name: 'year', value: 'older'}})}>Cũ hơn</button>
          </div>
        </div>

        <div className="filter-group">
          <label>Sắp xếp:</label>
          <div className="filter-options">
            <button className={searchParams.sort_field === 'created_at' && searchParams.sort_type === 'desc' ? 'active' : ''} 
              onClick={() => {
                handleInputChange({target: {name: 'sort_field', value: 'created_at'}});
                handleInputChange({target: {name: 'sort_type', value: 'desc'}});
              }}>
              Mới nhất
            </button>
            <button className={searchParams.sort_field === 'updated_at' && searchParams.sort_type === 'desc' ? 'active' : ''} 
              onClick={() => {
                handleInputChange({target: {name: 'sort_field', value: 'updated_at'}});
                handleInputChange({target: {name: 'sort_type', value: 'desc'}});
              }}>
              Mới cập nhật
            </button>
            <button className={searchParams.sort_field === 'imdb_score' ? 'active' : ''} 
              onClick={() => handleInputChange({target: {name: 'sort_field', value: 'imdb_score'}})}>
              Điểm IMDb
            </button>
            <button className={searchParams.sort_field === 'views' ? 'active' : ''} 
              onClick={() => handleInputChange({target: {name: 'sort_field', value: 'views'}})}>
              Lượt xem
            </button>
          </div>
        </div>

        <button className="apply-filters" onClick={handleSearch}>
          Lọc kết quả
        </button>
      </div>

      {loading && <div className="loading">Đang tải...</div>}
      {error && <div className="error">{error}</div>}

      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img src={movie.poster_url} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.year} • {movie.country}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button 
          onClick={() => setSearchParams(prev => ({...prev, page: prev.page - 1}))}
          disabled={searchParams.page === 1}
        >
          Trang trước
        </button>
        <span>Trang {searchParams.page}</span>
        <button 
          onClick={() => setSearchParams(prev => ({...prev, page: prev.page + 1}))}
          disabled={movies.length < searchParams.limit}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default MovieSearch; 