import { Badge } from '@mui/material';
import React from 'react';

function RentMovie(props) {
    return (
        <div className='min-h-screen py-25 bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className='max-w-md mx-auto px-4'>
                <div className='font-bold text-2xl max-w-xl mx-auto text-center border-b border-black pb-2'>
                    Phương thức thanh toán
                </div>
                <div className='text-center font-semibold text-blue-600 text-sm mt-4'>Bạn đang chọn thuê phim</div>
                <div className='flex justify-between items-center mt-4 bg-white p-4 rounded-lg shadow-md'>
                    <div className='text-lg font-semibold'>Avengers: Endgame</div>
                    <div className='text-lg font-semibold'>20.000</div>
                </div>
                <div className='text-center font-semibold text-blue-600 text-sm mt-4'>Tiết kiệm hơn với combo</div>
                <Badge badgeContent={"Lựa chọn tốt nhất"} color="primary" className='mt-4'>
                    <div className='p-4 bg-white rounded-lg shadow-md '>
                        <div className='flex justify-between items-center'>
                            <div className='text-lg font-semibold'>Gói Vip</div>
                            <div className='text-lg font-semibold'>59.000đ</div>
                        </div>
                        <div className='text-sm text-gray-600 space-y-1 mt-2'>
                            <p>Thời hạn 1 tháng, gia hạn tự động.</p>
                            <p>Đã bao gồm phim bạn đang chọn thuê.</p>
                            <p>Xem phim không giới hạn với hơn 10.000 giờ nội dung đặc sắc.</p>
                        </div>
                    </div>
                </Badge>

                    <div className='p-4 bg-white rounded-lg shadow-md mt-4'>
                        <div className='flex justify-between items-center'>
                            <div className='text-lg font-semibold'>Gói VVip</div>
                            <div className='text-lg font-semibold'>99.000đ</div>
                        </div>
                        <div className='text-sm text-gray-600 space-y-1 mt-2'>
                            <p>Thời hạn 1 tháng, gia hạn tự động.</p>
                            <p>Đã bao gồm phim bạn đang chọn thuê.</p>
                            <p>Kho phim có sẵn với hơn 10.000 giờ nội dung đặc cùng kho phim thuê Việt và Châu Á</p>
                        </div>
                    </div>
                
                    <button className='w-full bg-blue-600 text-white p-3 rounded-full mt-4'>Thanh toán</button>
                    <div className='text-center text-sm text-blue-600 mt-4'>Xem kho phim và thanh toán sau</div>
            </div>
            <div className='text-center text-sm text-gray-600 mt-4'>Chất lượng hình ảnh phụ thuộc vào dịch vụ internet và khả năng thiết bị của bạn. Không phải nội dung nào cũng xem được ở chế độ HD (720p), Full HD (1080p), Ultra HD (4K).</div>
        </div>
    );
}

export default RentMovie;