import React from 'react';
import { Table, Typography, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
function PlanManage(props) {
    return (
        <div className='pt-10 px-10 pb-10 mt-25 mb-10 mx-10 w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex flex-col gap-6 shadow-xl'>
            <Typography variant="h4" className='text-center font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>  Quản lý gói đăng ký </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: 'white' }}>#</TableCell>
                        <TableCell sx={{ color: 'white' }}>Tên gói</TableCell>
                        <TableCell sx={{ color: 'white' }}>Ngày bắt đầu</TableCell>
                        <TableCell sx={{ color: 'white' }}>Ngày kết thúc</TableCell>
                        <TableCell sx={{ color: 'white' }}>Giá tiền</TableCell>
                        <TableCell sx={{ color: 'white' }}>Phương thức thanh toán</TableCell>
                        <TableCell sx={{ color: 'white' }}>Trạng thái</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ color: 'white' }}>1</TableCell>
                        <TableCell sx={{ color: 'white' }}>Gói 1</TableCell>
                        <TableCell sx={{ color: 'white' }}>2024-01-01</TableCell>
                        <TableCell sx={{ color: 'white' }}>2024-01-01</TableCell>
                        <TableCell sx={{ color: 'white' }}>100000</TableCell>
                        <TableCell sx={{ color: 'white' }}>Thanh toán online</TableCell>
                        <TableCell sx={{ color: 'white' }}>Đã thanh toán</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default PlanManage;