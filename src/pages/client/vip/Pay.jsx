import React, { useContext, useState } from 'react';
import { Button, Divider } from '@mui/material';
import { CreditCard } from '@mui/icons-material';
import { MoviesContext } from '../../../context/MoviesProvider';
import { useParams, useNavigate } from 'react-router-dom';
import { ContextAuth } from '../../../context/AuthProvider';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { initialOptions } from '../../../utils/Contants';
import { addDocument } from '../../../services/firebaseService';

function Pay() {
    const movies = useContext(MoviesContext);
    const { id } = useParams();
    const { accountLogin } = useContext(ContextAuth);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const movie = movies.find((e) => e.id === id);

    const createRentMovie = async (transactionId) => {
        setIsLoading(true);
        try {
            const rentMovieData = {
                movieId: id,
                idUser: accountLogin.id,
                transactionId: transactionId,
                startDate: new Date(),
                expiryDate: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
                price: movie.rentalPrice,
                paymentMethod: "paypal",
            }
            await addDocument('rentMovies', rentMovieData);
            // Chuyển hướng sau khi thanh toán thành công
            navigate(`/main/movies/detail/${id}`);
        } catch (error) {
            console.error("Error creating rent movie:", error);
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-lg font-medium text-gray-700">Đang xử lý thanh toán...</p>
                    <p className="text-sm text-gray-500 mt-2">Vui lòng đợi trong giây lát</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-25">
            <div className="max-w-6xl mx-auto p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Thông tin thanh toán */}
                    {movie ? (
                        <div className="w-full md:w-1/2 mb-4 md:mb-0">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="font-bold text-lg mb-6 text-gray-800">
                                    THÔNG TIN THANH TOÁN
                                </div>

                                <div className="flex mb-6">
                                    <div className="mr-4">
                                        <img
                                            src={movie.imgUrl}
                                            alt={movie.name}
                                            className="w-32 h-40 rounded-md object-cover border border-gray-200"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="text-gray-600">Tài khoản:</div>
                                            <div className="font-medium">{accountLogin.email || accountLogin.username}</div>
                                        </div>
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="text-gray-600">Phim:</div>
                                            <div className="font-medium">{movie.name}</div>
                                        </div>
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="text-gray-600">Độ phân giải:</div>
                                            <div className="font-medium">{movie.quality || 'Full HD'}</div>
                                        </div>
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="text-gray-600">Thời hạn:</div>
                                            <div className="font-medium text-blue-500">{'48 tiếng'}</div>
                                        </div>
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="text-gray-600">Đơn giá:</div>
                                            <div className="font-medium text-red-500">{movie.rentalPrice} VND</div>
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
                                    <div className="font-bold text-red-500 text-base">{movie.rentalPrice} VND</div>
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
                    ) : (
                        <div className="w-full md:w-1/2 mb-4 md:mb-0">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="text-center text-gray-500">
                                    Không tìm thấy thông tin phim
                                </div>
                            </div>
                        </div>
                    )}



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

                            <PayPalScriptProvider options={initialOptions}>
                                <PayPalButtons
                                    style={{ layout: "vertical" }}
                                    createOrder={(data, actions) => {
                                        const total = movie.rentalPrice;
                                        const priceInUSD = (total / 26000).toFixed(2); // Chuyển từ VND sang USD
                                        return actions.order.create({
                                            purchase_units: [{
                                                amount: {
                                                    value: priceInUSD
                                                }
                                            }]
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            const transactionId = details.id; // Lấy ID giao dịch từ PayPal
                                            createRentMovie(transactionId);
                                        });
                                    }}
                                    onError={(err) => {
                                        console.error("PayPal error:", err);
                                    }}
                                />
                            </PayPalScriptProvider>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pay;