import { Badge, Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useContext, useState } from 'react';
import { MoviesContext } from '../../../context/MoviesProvider';
import { converDescription } from '../../../services/FunctionRepon';
import { RentMoviesContext } from '../../../context/RentMoviesProvider';

function Dashboard(props) {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const movies = useContext(MoviesContext);
    const rentMovies = useContext(RentMoviesContext);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i);

    const topRentMovies = rentMovies.reduce((acc, rent) => {
        const movieId = rent.movieId;
        if (!acc[movieId]) {
            acc[movieId] = 0;
        }
        acc[movieId]++;
        return acc;
    }, {});

    // Chuyển đổi thành mảng và sắp xếp theo số lượt thuê
    const sortedTopRentMovies = Object.entries(topRentMovies)
        .map(([movieId, rentCount]) => {
            const movie = movies.find(m => m.id === movieId);
            return {
                ...movie,
                rentCount
            };
        })
        .sort((a, b) => b.rentCount - a.rentCount);

    return (
        <div className='md:grid grid-cols-2 gap-4'>
            <div>
                <div className='flex gap-5 items-center border border-black rounded-t-lg p-3'>
                    <p className='text-lg font-medium'>Số người đăng ký gói</p>
                    <Box display="flex" gap={2}>
                        {/* Select tháng */}
                        <FormControl size="small">
                            <InputLabel>Tháng</InputLabel>
                            <Select
                                value={month}
                                label="Tháng"
                                onChange={(e) => setMonth(e.target.value)}
                                sx={{ 
                                    minWidth: '120px',
                                    backgroundColor: 'white'
                                }}
                            >
                                {[...Array(12)].map((_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>
                                        Tháng {i + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Select năm */}
                        <FormControl size="small">
                            <InputLabel>Năm</InputLabel>
                            <Select
                                value={year}
                                label="Năm"
                                onChange={(e) => setYear(e.target.value)}
                                sx={{ 
                                    minWidth: '120px',
                                    backgroundColor: 'white'
                                }}
                            >
                                {years.map((y) => (
                                    <MenuItem key={y} value={y}>
                                        {y}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>

                <div className='border-x border-b border-black rounded-b-lg p-3 h-[300px]' >

                </div>
            </div>

            <div>
                <div className='flex gap-5 items-center border border-black rounded-t-lg p-3'>
                    <p className='text-lg font-medium'>Tổng tiền gói đăng ký
                    </p>
                    <Box display="flex" gap={2}>
                        {/* Select tháng */}
                        <FormControl size="small">
                            <InputLabel>Tháng</InputLabel>
                            <Select
                                value={month}
                                label="Tháng"
                                onChange={(e) => setMonth(e.target.value)}
                                sx={{ 
                                    minWidth: '120px',
                                    backgroundColor: 'white'
                                }}
                            >
                                {[...Array(12)].map((_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>
                                        Tháng {i + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Select năm */}
                        <FormControl size="small">
                            <InputLabel>Năm</InputLabel>
                            <Select
                                value={year}
                                label="Năm"
                                onChange={(e) => setYear(e.target.value)}
                                sx={{ 
                                    minWidth: '120px',
                                    backgroundColor: 'white'
                                }}
                            >
                                {years.map((y) => (
                                    <MenuItem key={y} value={y}>
                                        {y}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>

                <div className='border-x border-b border-black rounded-b-lg p-3 h-[300px]' >

                </div>
            </div>

            <div className='bg-midnight rounded-lg'>
                <div className='flex gap-5 items-center border border-white rounded-t-lg p-3 text-white'>
                    <p className='text-lg font-medium'>Top phim được xem nhiều nhất
                    </p>
                </div>

                <div className='border-x border-b border-white rounded-b-lg p-3 ' >
                    {movies.sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 5).map((movie) => (
                        <div key={movie.id} className='flex items-center gap-4 p-3 hover:bg-tahiti border-b border-white transition-colors'>
                            <div>
                                <img 
                                    src={movie.imgUrl} 
                                    alt={movie.name} 
                                    className='w-20 h-20 object-cover rounded-lg shadow-md' 
                                />
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-lg font-semibold text-white'>{movie.name}</h3>
                                <p className='text-sm text-gray-300'>{converDescription(movie.description)}</p>
                                <p className='text-sm text-gray-300'>Lượt xem: {movie.viewsCount}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='bg-midnight rounded-lg'>
                <div className='flex gap-5 items-center border border-white rounded-t-lg p-3 text-white'>
                    <p className='text-lg font-medium'>Top phim được thuê nhiều nhất
                    </p>
                </div>

                <div className='border-x border-b border-white rounded-b-lg p-3 ' >
                    {sortedTopRentMovies.slice(0, 5).map((movie) => (
                        <div key={movie.id} className='flex items-center gap-4 p-3 hover:bg-tahiti border-b border-white transition-colors'>
                            <div>
                                <img 
                                    src={movie.imgUrl} 
                                    alt={movie.name} 
                                    className='w-20 h-20 object-cover rounded-lg shadow-md' 
                                />
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-lg font-semibold text-white'>{movie.name}</h3>
                                <p className='text-sm text-gray-300'>{converDescription(movie.description)}</p>
                                <p className='text-sm text-gray-300'>Lượt thuê: {movie.rentCount}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;