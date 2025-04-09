import React, { useState } from 'react';
import { FaTrophy, FaInfoCircle, FaAngleRight, FaAmazonPay, FaApplePay, FaGooglePay } from 'react-icons/fa';
import { MdOutlinePayments } from 'react-icons/md';
import { RiVisaFill } from 'react-icons/ri';

function PaymentPage() {
    const [selectedPlan, setSelectedPlan] = useState('12');
    const [selectedPayment, setSelectedPayment] = useState('card');

    const plans = [
        { id: '1', months: '1 Tháng', price: '70.000đ', savings: '' },
        { id: '6', months: '6 Tháng', price: '350.000đ', savings: 'Tiết kiệm 17%', originalPrice: '420.000đ' },
        { id: '12', months: '12 Tháng', price: '600.000đ', savings: 'Tiết kiệm 30%', originalPrice: '840.000đ', popular: true }
    ];

    const paymentMethods = [
        { id: 'card', name: 'Thẻ tín dụng', icon: <RiVisaFill /> },
        { id: 'momo', name: 'Ví MoMo', icon: <FaAmazonPay /> },
        { id: 'zalopay', name: 'Ví ZaloPay', icon: <FaApplePay /> },
        { id: 'shopeepay', name: 'Ví ShopeePay', icon: <FaGooglePay />},
        { id: 'vnpay', name: 'VNPAY', icon: <MdOutlinePayments />}
    ];

    return (
        <div className="px-20 py-25 font-sans text-gray-800 bg-stone-50">
            <h1 className="text-center text-2xl font-semibold mb-1">Phương thức thanh toán</h1>
            <div className="text-center border-b-2 border-blue-600 w-max mx-auto mb-8 pb-1 text-gray-600">Hủy bất cứ lúc nào</div>
            
            <div className="flex flex-col lg:flex-row gap-5">
                <div className="w-full lg:w-[48%]">
                    <div className="mb-8 bg-white rounded-lg shadow-md p-5">
                        <h2 className="text-lg font-semibold mb-4">Thời hạn Gói Cao Cấp</h2>
                        
                        {plans.map(plan => (
                            <div 
                                key={plan.id} 
                                className={`flex justify-between items-center p-3 rounded-md mb-3 cursor-pointer border transition-all ${
                                    selectedPlan === plan.id 
                                    ? 'border-blue-600 bg-blue-50' 
                                    : 'border-gray-200 hover:border-blue-600'
                                } ${plan.popular ? 'border-blue-600' : ''}`}
                                onClick={() => setSelectedPlan(plan.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="radio" 
                                        name="plan" 
                                        checked={selectedPlan === plan.id} 
                                        onChange={() => setSelectedPlan(plan.id)}
                                        className="text-blue-600"
                                    />
                                    <span className="font-medium">{plan.months}</span>
                                    {plan.savings && <span className="text-xs text-gray-500 ml-2">{plan.savings}</span>}
                                    {plan.popular && (
                                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs ml-2">
                                            Phổ Biến
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="font-semibold text-lg">{plan.price}</span>
                                    {plan.originalPrice && (
                                        <span className="text-sm text-gray-500 line-through">
                                            {plan.originalPrice}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-5">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-lg font-semibold">THÔNG TIN THANH TOÁN</h2>
                            <button className="text-blue-600 font-medium hover:underline">Thay đổi gói</button>
                        </div>
                        
                        <div className="py-4">
                            <div className="flex mb-5">
                                <div className="w-[70px] h-[70px] bg-gray-100 rounded-lg flex items-center justify-center mr-5">
                                    <FaTrophy className="text-3xl text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-2.5">
                                        <span className="text-gray-500">Tài khoản</span>
                                        <span className="font-medium">0378 486 992</span>
                                    </div>
                                    <div className="flex justify-between mb-2.5">
                                        <span className="text-gray-500">Tên gói</span>
                                        <span className="font-medium">Gói Cao Cấp</span>
                                    </div>
                                    <div className="flex justify-between mb-2.5">
                                        <span className="text-gray-500">Thời hạn</span>
                                        <span className="font-medium text-blue-600">12 tháng</span>
                                    </div>
                                    <div className="flex justify-between mb-2.5">
                                        <span className="text-gray-500">Ngày hiệu lực</span>
                                        <span className="font-medium">05/04/2025</span>
                                    </div>
                                    <div className="flex justify-between mb-2.5">
                                        <span className="text-gray-500">Tự động gia hạn</span>
                                        <span className="font-medium">05/04/2026</span>
                                    </div>
                                    <div className="flex justify-between mb-2.5">
                                        <span className="text-gray-500">Đơn giá</span>
                                        <span className="font-medium text-blue-600">600.000đ</span>
                                    </div>
                                    <div className="flex justify-between mb-2.5">
                                        <span className="text-gray-500">Khuyến mãi</span>
                                        <span className="font-medium">0đ</span>
                                    </div>
                                    <div className="flex justify-between pt-2.5 mt-2.5 border-t border-gray-200 font-semibold">
                                        <span className="text-gray-500">Tổng cộng</span>
                                        <span className="text-blue-600">600.000đ</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-xs text-gray-500 mb-5 leading-relaxed">
                                * Thuê bao tự động gia hạn hàng tháng trừ phi bạn hủy thuê bao ít nhất 24 giờ trước khi hết hạn
                            </div>
                            
                            <div className="flex items-center py-2.5 cursor-pointer">
                                <div className="text-blue-600 mr-2.5">
                                    <FaInfoCircle />
                                </div>
                                <span className="flex-1 text-blue-600 font-medium">Áp dụng ưu đãi</span>
                                <FaAngleRight className="text-blue-600" />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="w-full lg:w-[52%] lg:pl-5">
                    <h2 className="text-lg font-semibold mb-4">Chọn phương thức thanh toán</h2>
                    
                    <div className="flex flex-wrap gap-4 mb-8">
                        {paymentMethods.map(method => (
                            <div 
                                key={method.id}
                                className={`w-[130px] h-[80px] border rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all p-2.5 ${
                                    selectedPayment === method.id 
                                    ? 'border-blue-600' 
                                    : 'border-gray-200 hover:border-blue-600'
                                }`}
                                onClick={() => setSelectedPayment(method.id)}
                            >
                                <div className="text-sm text-center">{method.name}</div>
                                <div className="text-4xl text-center">
                                        {method.icon}
                                    </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tên in trên thẻ" />
                        </div>
                        <div>
                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Số thẻ" />
                        </div>
                        
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm text-gray-600 mb-1">Ngày hết hạn</label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="MM/YY" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm text-gray-600 mb-1">
                                    Mã bảo mật <FaInfoCircle className="inline-block ml-1 text-gray-400" />
                                </label>
                                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="CVV" />
                            </div>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                            <p>
                                Bằng việc thanh toán, Quý khách đã đồng ý với <a href="#" className="text-blue-600 hover:underline">Quy chế sử dụng Dịch vụ</a> của Galaxy Play và ủy quyền cho Galaxy Play tự động gia hạn khi hết hạn sử dụng, cho đến khi bạn hủy tự động gia hạn.
                            </p>
                        </div>
                        
                        <button className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                            Thanh toán
                        </button>
                        
                        <a href="#" className="block text-center text-blue-600 hover:underline">
                            Xem kho phim và thanh toán sau
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;