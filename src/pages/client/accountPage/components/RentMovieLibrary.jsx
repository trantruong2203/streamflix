import React, { useEffect, useState } from 'react';
import { Table, Typography, TableHead, TableRow, TableCell, TableBody, Stack, Pagination, TablePagination } from '@mui/material';
import { useContext } from 'react';
import { MoviesContext } from '../../../../context/MoviesProvider';
import { RentMoviesContext } from '../../../../context/RentMoviesProvider';
import { getOjectById, toDateString } from '../../../../services/FunctionRepon';
import { ContextAuth } from '../../../../context/AuthProvider';

function RentMovieLibrary(props) {
    const { accountLogin } = useContext(ContextAuth);
    const rentMovies = useContext(RentMoviesContext);
    const movies = useContext(MoviesContext);
    const [showRentMovies, setShowRentMovies] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        if (timestamp.toDate) {
            return timestamp.toDate().toLocaleDateString('vi-VN');
        }
        return timestamp;
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const calculateDaysUntilExpiry = (movie) => {
        const today = new Date();
        const expiry = movie.expiryDate.toDate();
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    useEffect(() => {
        const rentMovieByUser = rentMovies.filter(movie => movie.idUser === accountLogin.id);
        setShowRentMovies(rentMovieByUser);
    }, [accountLogin, movies]);

    return (
        <div className='pt-10 px-10 pb-10 mt-25 mb-10 mx-10 w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex flex-col gap-6 shadow-xl'>
            <Typography variant="h4" className='text-center font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                Quản lý thư viện phim
            </Typography>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>Tên phim</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>Hình ảnh</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>Ngày thuê</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>Ngày còn lại</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>Trạng thái</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {showRentMovies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((movie, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ color: 'white' }}>{getOjectById(movies, movie.movieId).name}</TableCell>
                            <TableCell sx={{ color: 'white' }}><img className='w-10 h-15 rounded-lg' src={getOjectById(movies, movie.movieId)?.imgUrl} alt='img' /></TableCell>
                            <TableCell sx={{ color: 'white' }}>{formatDate(movie.startDate)}</TableCell>
                            <TableCell sx={{ color: 'white' }}>{calculateDaysUntilExpiry(movie)} ngày</TableCell>
                            <TableCell sx={{ color: 'white' }}>{calculateDaysUntilExpiry(movie) > 0
                                ? <div className='text-green-500 border border-green-500 rounded-lg px-2 py-1 text-center'>Còn hạn</div>
                                : <div className='text-red-500 border border-red-500 rounded-lg px-2 py-1 text-center'>Đã hết hạn</div>}
                            </TableCell>
                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>Hành động</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={showRentMovies.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ color: 'white' }}
            />
        </div>
    );
}

export default RentMovieLibrary;