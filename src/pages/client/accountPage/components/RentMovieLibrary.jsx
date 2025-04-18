import React from 'react';
import { Table, Typography, TableHead, TableRow, TableCell, TableBody    } from '@mui/material';
function RentMovieLibrary(props) {
    return (
        <div className='pt-10 px-10 pb-10 mt-25 mb-10 mx-10 w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex flex-col gap-6 shadow-xl'>
            <Typography variant="h4" className='text-center font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                Quản lý thư viện phim
            </Typography>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: 'white' }}>Tên phim</TableCell>
                        <TableCell sx={{ color: 'white' }}>Hình ảnh</TableCell>
                        <TableCell sx={{ color: 'white' }}>Ngày thuê</TableCell>
                        <TableCell sx={{ color: 'white' }}>Ngày còn lại</TableCell>
                        <TableCell sx={{ color: 'white' }}>Trạng thái</TableCell>
                        <TableCell sx={{ color: 'white' }}>Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ color: 'white' }}>Phim 1</TableCell>
                        <TableCell sx={{ color: 'white' }}>Hình ảnh 1</TableCell>
                        <TableCell sx={{ color: 'white' }}>Ngày thuê 1</TableCell>
                        <TableCell sx={{ color: 'white' }}>Ngày còn lại 1</TableCell>
                        <TableCell sx={{ color: 'white' }}>Trạng thái 1</TableCell>
                        <TableCell sx={{ color: 'white' }}>Hành động 1</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default RentMovieLibrary;