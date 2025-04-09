import React from 'react';
import { Button, Divider } from '@mui/material';
import { CreditCard } from '@mui/icons-material';

function Pay() {
    return (
        <div className="bg-gray-100 min-h-screen py-25">
            <div className="max-w-6xl mx-auto p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Thông tin thanh toán */}
                    <div className="w-full md:w-1/2 mb-4 md:mb-0">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="font-bold text-lg mb-6 text-gray-800">
                                THÔNG TIN THANH TOÁN
                            </div>
                            
                            <div className="flex mb-6">
                                <div className="mr-4">
                                    <img 
                                        src="/src/assets/inception_ver4_xlg.jpg" 
                                        alt="Gặp Lại Chị Đậu" 
                                        className="w-32 h-40 rounded-md object-cover border border-gray-200" 
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="text-gray-600">Tài khoản:</div>
                                        <div className="font-medium">0865 486 992</div>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="text-gray-600">Phim:</div>
                                        <div className="font-medium">Inception</div>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="text-gray-600">Độ phân giải:</div>
                                        <div className="font-medium">HD</div>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="text-gray-600">Thời hạn:</div>
                                        <div className="font-medium text-blue-500">48 tiếng</div>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="text-gray-600">Đơn giá:</div>
                                        <div className="font-medium text-red-500">20.000 VND</div>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="text-gray-600">Khuyến mãi:</div>
                                        <div className="font-medium text-red-500">0đ</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="h-px bg-gray-300 my-4"></div>
                            
                            <div className="flex justify-between items-center mb-3">
                                <div className="font-bold text-base">Tổng cộng</div>
                                <div className="font-bold text-red-500 text-base">20.000 VND</div>
                            </div>
                            
                            <div className="text-xs text-gray-500 mt-4 mb-3">
                                * Lưu ý: Thời gian thuê phim là 30 ngày sau khi thuê và còn 48 giờ khi bắt đầu xem phim.
                            </div>
                            
                            <button 
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-2 font-medium text-sm"
                            >
                                Áp dụng ưu đãi
                            </button>
                        </div>
                    </div>
                    
                    {/* Phương thức thanh toán */}
                    <div className="w-full md:w-1/2">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="font-bold text-lg mb-6 text-gray-800">
                                Chọn phương thức thanh toán
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <button className="w-full flex items-center justify-start p-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                                        <div className="bg-gray-100 p-1.5 mr-2 rounded-md flex items-center justify-center w-8 h-8">
                                            <CreditCard sx={{ fontSize: 20, color: '#757575' }} />
                                        </div>
                                        <div>Thẻ tín dụng</div>
                                    </button>
                                </div>
                                <div>
                                    <button className="w-full flex items-center justify-start p-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                                        <div className="bg-gray-100 p-1.5 mr-2 rounded-md flex items-center justify-center w-8 h-8">
                                            <CreditCard sx={{ fontSize: 20, color: '#757575' }} />
                                        </div>
                                        <div>Thẻ ATM</div>
                                    </button>
                                </div>
                                <div>
                                    <button className="w-full flex items-center justify-start p-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                                        <div className="bg-pink-100 p-1.5 mr-2 rounded-md flex items-center justify-center w-8 h-8">
                                            <div className="font-bold text-pink-600 text-xs">M</div>
                                        </div>
                                        <div>Ví MoMo</div>
                                    </button>
                                </div>
                                <div>
                                    <button className="w-full flex items-center justify-start p-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                                        <div className="bg-blue-100 p-1.5 mr-2 rounded-md flex items-center justify-center w-8 h-8">
                                            <div className="font-bold text-blue-600 text-xs">Z</div>
                                        </div>
                                        <div>Ví ZaloPay</div>
                                    </button>
                                </div>
                                <div>
                                    <button className="w-full flex items-center justify-start p-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                                        <div className="bg-orange-100 p-1.5 mr-2 rounded-md flex items-center justify-center w-8 h-8">
                                            <div className="font-bold text-orange-600 text-xs">S</div>
                                        </div>
                                        <div>Ví ShopeePay</div>
                                    </button>
                                </div>
                                <div>
                                    <button className="w-full flex items-center justify-start p-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                                        <div className="bg-blue-100 p-1.5 mr-2 rounded-md flex items-center justify-center w-8 h-8">
                                            <div className="font-bold text-blue-700 text-xs">VN</div>
                                        </div>
                                        <div>VNPAY</div>
                                    </button>
                                </div>
                            </div>
                            
                            <button 
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 py-3 px-4 rounded-lg mt-6 mb-3 font-bold text-base"
                            >
                                <div className="flex items-center justify-center">
                                    <div className="font-bold">PayPal</div>
                                </div>
                            </button>
                            
                            <button 
                                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg flex items-center justify-center text-base"
                            >
                                <CreditCard style={{ fontSize: 20, marginRight: 8 }} />
                                Thẻ ghi nợ hoặc tín dụng
                            </button>
                            
                            <div className="mt-3 text-center">
                                <div className="text-xs text-gray-500 flex items-center justify-center">
                                    <span>Được hỗ trợ bởi</span>
                                    <div className="ml-1 text-blue-500 font-medium">PayPal</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pay;