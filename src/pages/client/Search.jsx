import React, { useState, useEffect } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Grid, 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Slider, 
    Chip,
    Pagination,
    CircularProgress,
    Alert
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Search() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Search states
    const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
    const [totalResults, setTotalResults] = useState(0);
    
    // Filter states
    const [sortField, setSortField] = useState(searchParams.get('sort_field') || 'modified.time');
    const [sortType, setSortType] = useState(searchParams.get('sort_type') || 'desc');
    const [sortLang, setSortLang] = useState(searchParams.get('sort_lang') || '');
    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [country, setCountry] = useState(searchParams.get('country') || '');
    const [year, setYear] = useState([
        parseInt(searchParams.get('year_start')) || 1970, 
        parseInt(searchParams.get('year_end')) || new Date().getFullYear()
    ]);
    const [limit, setLimit] = useState(parseInt(searchParams.get('limit')) || 20);
    
    // Categories and countries data
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);

    // Fetch categories and countries on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('https://phimapi.com/the-loai');
                if (res.data && res.data.data) {
                    setCategories(res.data.data);
                }
            } catch (err) {
                console.error('Lỗi khi tải danh mục:', err);
            }
        };

        const fetchCountries = async () => {
            try {
                const res = await axios.get('https://phimapi.com/quoc-gia');
                if (res.data && res.data.data) {
                    setCountries(res.data.data);
                }
            } catch (err) {
                console.error('Lỗi khi tải quốc gia:', err);
            }
        };

        fetchCategories();
        fetchCountries();
    }, []);

    // Update URL params when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (keyword) params.set('keyword', keyword);
        if (currentPage > 1) params.set('page', currentPage.toString());
        if (sortField !== 'modified.time') params.set('sort_field', sortField);
        if (sortType !== 'desc') params.set('sort_type', sortType);
        if (sortLang) params.set('sort_lang', sortLang);
        if (category) params.set('category', category);
        if (country) params.set('country', country);
        if (year[0] !== 1970) params.set('year_start', year[0].toString());
        if (year[1] !== new Date().getFullYear()) params.set('year_end', year[1].toString());
        if (limit !== 20) params.set('limit', limit.toString());
        
        setSearchParams(params);
    }, [keyword, currentPage, sortField, sortType, sortLang, category, country, year, limit, setSearchParams]);

    // Search effect
    useEffect(() => {
        if (!keyword.trim()) {
            setResults([]);
            setTotalPages(0);
            setTotalResults(0);
            return;
        }

        const fetchSearchAPI = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    keyword: keyword,
                    page: currentPage,
                    sort_field: sortField,
                    sort_type: sortType,
                    limit: limit
                });

                if (sortLang) params.append('sort_lang', sortLang);
                if (category) params.append('category', category);
                if (country) params.append('country', country);
                if (year[0] !== 1970 || year[1] !== new Date().getFullYear()) {
                    params.append('year', year[1]); // Sử dụng năm cuối của range
                }

                const res = await axios.get(`https://phimapi.com/v1/api/tim-kiem?${params.toString()}`);
                
                if (res.data && res.data.data) {
                    setResults(res.data.data.items || []);
                    setTotalPages(res.data.data.totalPages || 0);
                    setTotalResults(res.data.data.total || 0);
                } else {
                    setResults([]);
                    setTotalPages(0);
                    setTotalResults(0);
                }
            } catch (err) {
                console.error('Lỗi khi tìm kiếm:', err);
                setResults([]);
                setTotalPages(0);
                setTotalResults(0);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchSearchAPI, 500); // Debounce 500ms
        return () => clearTimeout(timeoutId);
    }, [keyword, currentPage, sortField, sortType, sortLang, category, country, year, limit]);

    const handleYearChange = (event, newValue) => {
        setYear(newValue);
        setCurrentPage(1); // Reset về trang 1 khi thay đổi năm
    };

    const handleSearch = () => {
        setCurrentPage(1); // Reset về trang 1 khi tìm kiếm mới
    };

    const clearFilters = () => {
        setSortField('modified.time');
        setSortType('desc');
        setSortLang('');
        setCategory('');
        setCountry('');
        setYear([1970, new Date().getFullYear()]);
        setLimit(20);
        setCurrentPage(1);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <Box className="mb-8">
                    <Typography variant="h4" className="text-white mb-2">
                        Tìm kiếm phim
                    </Typography>
                    <Typography variant="body1" className="text-gray-400">
                        Khám phá kho phim khổng lồ với bộ lọc tìm kiếm nâng cao
                    </Typography>
                </Box>

                {/* Search Input */}
                <Box className="mb-6">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                placeholder="Nhập tên phim, diễn viên, đạo diễn..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#1a1a1a',
                                        borderRadius: '8px',
                                        '& fieldset': {
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(255, 255, 255, 0.5)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#3b82f6',
                                        },
                                        '& input': {
                                            color: 'white',
                                            fontSize: '16px',
                                            '&::placeholder': {
                                                color: 'rgba(255, 255, 255, 0.7)',
                                            },
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleSearch}
                                disabled={!keyword.trim()}
                                sx={{
                                    backgroundColor: '#3b82f6',
                                    '&:hover': {
                                        backgroundColor: '#2563eb',
                                    },
                                    height: '56px',
                                }}
                            >
                                Tìm kiếm
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {/* Filters */}
                <Box className="bg-[#1a1a1a] p-6 rounded-lg mb-6">
                    <Typography variant="h6" className="text-white mb-4">
                        Bộ lọc tìm kiếm
                    </Typography>
                    
                    <Grid container spacing={3}>
                        {/* Sort Field */}
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel className="text-gray-300">Sắp xếp theo</InputLabel>
                                <Select
                                    value={sortField}
                                    onChange={(e) => setSortField(e.target.value)}
                                    className="text-white"
                                    sx={{
                                        backgroundColor: '#2a2a2a',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.5)',
                                        },
                                        '& .MuiSelect-icon': {
                                            color: 'white',
                                        },
                                    }}
                                >
                                    <MenuItem value="modified.time">Thời gian cập nhật</MenuItem>
                                    <MenuItem value="_id">ID phim</MenuItem>
                                    <MenuItem value="year">Năm phát hành</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Sort Type */}
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel className="text-gray-300">Thứ tự</InputLabel>
                                <Select
                                    value={sortType}
                                    onChange={(e) => setSortType(e.target.value)}
                                    className="text-white"
                                    sx={{
                                        backgroundColor: '#2a2a2a',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.5)',
                                        },
                                        '& .MuiSelect-icon': {
                                            color: 'white',
                                        },
                                    }}
                                >
                                    <MenuItem value="desc">Giảm dần</MenuItem>
                                    <MenuItem value="asc">Tăng dần</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Language */}
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel className="text-gray-300">Ngôn ngữ</InputLabel>
                                <Select
                                    value={sortLang}
                                    onChange={(e) => setSortLang(e.target.value)}
                                    className="text-white"
                                    sx={{
                                        backgroundColor: '#2a2a2a',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.5)',
                                        },
                                        '& .MuiSelect-icon': {
                                            color: 'white',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Tất cả</MenuItem>
                                    <MenuItem value="vietsub">Vietsub</MenuItem>
                                    <MenuItem value="thuyet-minh">Thuyết minh</MenuItem>
                                    <MenuItem value="long-tieng">Lồng tiếng</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Limit */}
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel className="text-gray-300">Số kết quả</InputLabel>
                                <Select
                                    value={limit}
                                    onChange={(e) => setLimit(e.target.value)}
                                    className="text-white"
                                    sx={{
                                        backgroundColor: '#2a2a2a',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.5)',
                                        },
                                        '& .MuiSelect-icon': {
                                            color: 'white',
                                        },
                                    }}
                                >
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={32}>32</MenuItem>
                                    <MenuItem value={64}>64</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Category */}
                        <Grid item xs={12} sm={6} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel className="text-gray-300">Thể loại</InputLabel>
                                <Select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="text-white"
                                    sx={{
                                        backgroundColor: '#2a2a2a',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.5)',
                                        },
                                        '& .MuiSelect-icon': {
                                            color: 'white',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Tất cả</MenuItem>
                                    {categories.map((cat) => (
                                        <MenuItem key={cat.slug} value={cat.slug}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Country */}
                        <Grid item xs={12} sm={6} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel className="text-gray-300">Quốc gia</InputLabel>
                                <Select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="text-white"
                                    sx={{
                                        backgroundColor: '#2a2a2a',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.5)',
                                        },
                                        '& .MuiSelect-icon': {
                                            color: 'white',
                                        },
                                    }}
                                >
                                    <MenuItem value="">Tất cả</MenuItem>
                                    {countries.map((coun) => (
                                        <MenuItem key={coun.slug} value={coun.slug}>
                                            {coun.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Year Range Slider */}
                        <Grid item xs={12}>
                            <Box>
                                <Typography className="text-white mb-2">
                                    Năm phát hành: {year[0]} - {year[1]}
                                </Typography>
                                <Slider
                                    value={year}
                                    onChange={handleYearChange}
                                    valueLabelDisplay="auto"
                                    min={1970}
                                    max={new Date().getFullYear()}
                                    sx={{
                                        color: '#3b82f6',
                                        '& .MuiSlider-thumb': {
                                            backgroundColor: '#3b82f6',
                                        },
                                        '& .MuiSlider-track': {
                                            backgroundColor: '#3b82f6',
                                        },
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Clear Filters Button */}
                    <Box className="mt-4 flex justify-end">
                        <Button
                            variant="outlined"
                            onClick={clearFilters}
                            sx={{
                                borderColor: '#ef4444',
                                color: '#ef4444',
                                '&:hover': {
                                    borderColor: '#dc2626',
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                },
                            }}
                        >
                            Xóa bộ lọc
                        </Button>
                    </Box>
                </Box>

                {/* Results */}
                {keyword && (
                    <Box className="mb-6">
                        {loading ? (
                            <Box className="flex justify-center items-center py-8">
                                <CircularProgress sx={{ color: '#3b82f6' }} />
                                <Typography className="ml-3 text-white">Đang tìm kiếm...</Typography>
                            </Box>
                        ) : (
                            <>
                                {/* Results Info */}
                                <Box className="mb-4">
                                    <Typography variant="h6" className="text-white">
                                        Tìm thấy {totalResults} kết quả cho "{keyword}"
                                    </Typography>
                                    {totalPages > 1 && (
                                        <Typography variant="body2" className="text-gray-400">
                                            Trang {currentPage} / {totalPages}
                                        </Typography>
                                    )}
                                </Box>

                                {/* Results Grid */}
                                {results.length > 0 ? (
                                    <Grid container spacing={3}>
                                        {results.map((movie) => (
                                            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                                                <Card 
                                                    className="bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                                                    onClick={() => navigate(`/movie/${movie.slug}`)}
                                                >
                                                    <CardMedia
                                                        component="img"
                                                        height="300"
                                                        image={movie.thumb_url}
                                                        alt={movie.name}
                                                        className="object-cover"
                                                    />
                                                    <CardContent>
                                                        <Typography variant="h6" className="text-white mb-2 line-clamp-2">
                                                            {movie.name}
                                                        </Typography>
                                                        <Typography variant="body2" className="text-gray-400 mb-2">
                                                            {movie.year} • {movie.category}
                                                        </Typography>
                                                        <Box className="flex flex-wrap gap-1">
                                                            {movie.lang && (
                                                                <Chip 
                                                                    label={movie.lang} 
                                                                    size="small" 
                                                                    className="bg-blue-600 text-white"
                                                                />
                                                            )}
                                                            {movie.quality && (
                                                                <Chip 
                                                                    label={movie.quality} 
                                                                    size="small" 
                                                                    className="bg-green-600 text-white"
                                                                />
                                                            )}
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Alert severity="info" className="bg-blue-900 text-white">
                                        Không tìm thấy kết quả nào cho "{keyword}". Hãy thử từ khóa khác hoặc điều chỉnh bộ lọc.
                                    </Alert>
                                )}
                            </>
                        )}
                    </Box>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <Box className="flex justify-center mt-8">
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    color: 'white',
                                    '&.Mui-selected': {
                                        backgroundColor: '#3b82f6',
                                    },
                                },
                            }}
                        />
                    </Box>
                )}
            </div>
        </div>
    );
}

export default Search;