import React, { useContext } from 'react';
import { Table, Typography, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { ContextAuth } from '../../../../context/AuthProvider';
import { PlansContext } from '../../../../context/PlansProvider';
import { SubscriptionsContext } from '../../../../context/SubscriptionProvider';
import { getOjectById } from '../../../../services/FunctionRepon';

function PlanManage(props) {
    const { accountLogin } = useContext(ContextAuth);
    const subscriptions = useContext(SubscriptionsContext)
    const plans = useContext(PlansContext)

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        if (timestamp.toDate) {
            return timestamp.toDate().toLocaleDateString('vi-VN');
        }
        return timestamp;
    };

    const showPlanByUser = subscriptions.filter(s => s.userId === accountLogin.id);
    return (
        <div className='pt-10 px-10 pb-10 mt-25 mb-10 mx-10 w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex flex-col gap-6 shadow-xl'>
            <Typography variant="h4" className='text-center font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>  Quản lý gói đăng ký </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>#</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>Tên gói</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>Ngày bắt đầu</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>Ngày kết thúc</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>Giá tiền</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>Phương thức thanh toán</TableCell>
                        <TableCell sx={{ color: 'white', textAlign: 'center' }}>Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {showPlanByUser.map((PlanManage, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>{index + 1}</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>{getOjectById(plans, PlanManage.planId).title}</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>{formatDate(PlanManage.startDate)}</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>{formatDate(PlanManage.expiryDate)}</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>{getOjectById(plans, PlanManage.planId).PricePerMonth} đ</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>{PlanManage.paymentMethod}</TableCell>
                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>{PlanManage.expiryDate.toDate() < new Date() ? <div className='text-red-500 border border-red-500 rounded-lg px-2 py-1 text-center'>Đã hết hạn</div> : <div className='text-green-500 border border-green-500 rounded-lg px-2 py-1 text-center'>Còn hạn</div>}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default PlanManage;