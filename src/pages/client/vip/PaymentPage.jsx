import React, { useContext, useEffect, useState } from 'react';
import { FaTrophy, FaInfoCircle, FaAngleRight, FaAmazonPay, FaApplePay, FaGooglePay } from 'react-icons/fa';
import { MdOutlinePayments } from 'react-icons/md';
import { RiVisaFill } from 'react-icons/ri';
import { PlansContext } from '../../../context/PlansProvider';
import { PackageContext } from '../../../context/PackageProvider';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getOjectById } from '../../../services/FunctionRepon';
import { ContextAuth } from '../../../context/AuthProvider';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { initialOptions } from '../../../utils/Contants';
import { useRef } from 'react';
import { Login } from '@mui/icons-material';
import { useNotification } from '../../../context/NotificationProvide';
import { addDocument, updateDocument } from '../../../services/firebaseService';
import { SubscriptionsContext } from '../../../context/SubscriptionProvider';

function PaymentPage() {
    const [selectedPayment, setSelectedPayment] = useState('card');
    const { id } = useParams();
    const plans = useContext(PlansContext);
    const pakages = useContext(PackageContext);
    const { accountLogin } = useContext(ContextAuth);
    const showNotification = useNotification();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const subscriptions = useContext(SubscriptionsContext);
    const plan = plans.find(plan => plan.id === id);
    const listPakage = pakages.filter(pakage => pakage.planId === id).sort((a, b) => a.time - b.time);
    const [selectedPlan, setSelectedPlan] = useState(listPakage[0] || {});
    const totalPriceRef = useRef(0);

    const paymentMethods = [
        { id: 'card', name: 'Thẻ tín dụng', icon: <RiVisaFill /> },
        { id: 'momo', name: 'Ví MoMo', icon: <FaAmazonPay /> },
        { id: 'zalopay', name: 'Ví ZaloPay', icon: <FaApplePay /> },
        { id: 'shopeepay', name: 'Ví ShopeePay', icon: <FaGooglePay /> },
        { id: 'vnpay', name: 'VNPAY', icon: <MdOutlinePayments /> }
    ];

    useEffect(() => {
        setSelectedPlan(listPakage[0]);
    }, [pakages]);

    useEffect(() => {
        if (plan) {
            const price = (plan.PricePerMonth * selectedPlan?.time) - (plan.PricePerMonth * selectedPlan?.time * selectedPlan?.discount / 100);
            totalPriceRef.current = price;
        }
    }, [plan, selectedPlan]);

    const createSubscription = async (id) => {
        setIsLoading(true);
        const startDate = new Date();
        const expiryDate = new Date();
        expiryDate.setMonth(startDate.getMonth() + (parseInt(selectedPlan.time) || 1));
        const subscriptionData = {
            planId: plan.id,
            packageId: selectedPlan.id,
            paymentMethod: selectedPayment,
            transactionId: id,
            userId: accountLogin?.id,
            startDate: startDate,
            expiryDate: expiryDate,
        };

        const subscriptionExists = subscriptions?.find(sub => sub.userId === accountLogin?.id && sub.planId === plan.id);

        if (subscriptionExists && subscriptionExists.expiryDate.toDate() > startDate) {
            const a = subscriptionExists.expiryDate.toDate();
            a.setMonth(a.getMonth() + (parseInt(selectedPlan.time) || 1));

            await updateDocument('subscriptions', { ...subscriptionExists, expiryDate: a });
            showNotification("Đã gia hạn gói thành công", "success");
        } else {
            await addDocument('subscriptions', subscriptionData);
            showNotification("Đăng ký gói thành công", "success");
        }
        navigate(`/main`);
        setIsLoading(false);
    }

    return (
        <div className="px-20 py-25 font-sans text-gray-800 bg-stone-50">
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-lg font-medium text-gray-700">Đang xử lý thanh toán...</p>
                        <p className="text-sm text-gray-500 mt-2">Vui lòng đợi trong giây lát</p>
                    </div>
                </div>
            )}
            <h1 className="text-center text-2xl font-semibold mb-1">Phương thức thanh toán</h1>
            <div className="text-center border-b-2 border-blue-600 w-max mx-auto mb-8 pb-1 text-gray-600">Hủy bất cứ lúc nào</div>

            <div className="flex flex-col lg:flex-row gap-5">
                <div className="w-full lg:w-[48%]">
                    <div className="mb-8 bg-white rounded-lg shadow-md p-5">
                        <h2 className="text-lg font-semibold mb-4">Thời hạn gói {plan?.title}</h2>

                        {listPakage.map(p => (
                            <div
                                key={p.id}
                                className={`flex justify-between items-center p-3 rounded-md mb-3 cursor-pointer border transition-all ${selectedPlan?.id === p.id
                                    ? 'border-blue-600 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-600'
                                    } ${p.popular ? 'border-blue-600' : ''}`}
                                onClick={() => setSelectedPlan(p)}
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="plan"
                                        checked={selectedPlan?.id === p.id}
                                        onChange={() => setSelectedPlan(p)}
                                        className="text-blue-600"
                                    />
                                    <span className="font-medium">{p.time} tháng</span>
                                    {p.discount > 0 && <span className="text-xs text-red-500 ml-2">-{p.discount}%</span>}
                                    {p.popular && (
                                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs ml-2">
                                            Phổ Biến
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="font-semibold text-lg ">{((plan?.PricePerMonth * p.time) - (plan?.PricePerMonth * p.time * p.discount / 100)).toLocaleString('vi-VN')} đ</span>

                                    <span className="text-sm text-gray-500 line-through">
                                        {parseInt(plan?.PricePerMonth * p.time).toLocaleString('vi-VN')}  đ
                                    </span>

                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-5">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-lg font-semibold">THÔNG TIN THANH TOÁN</h2>
                            <Link to="/main/vip" className="text-blue-600 font-medium hover:underline">Thay đổi gói</Link>
                        </div>

                        <div className="py-4">
                            <div className="flex mb-5">
                                <div className="w-[70px] h-[70px] bg-gray-100 rounded-lg flex items-center justify-center mr-5">
                                    <FaTrophy className="text-3xl text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-2.5">
                                        <span className="text-gray-500">Tài khoản</span>
                                        <span className="font-medium">{accountLogin?.email}</span>
                                    </div>
                                    <div className="flex justify-between mb-2.5">
                                        <span className="text-gray-500">Tên gói</span>
                                        <span className="font-medium">{plan?.title || 'Gói Cao Cấp'}</span>
                                    </div>
                                    <div className="flex justify-between mb-2.5">
                                        <span className="text-gray-500">Thời hạn</span>
                                        <span className="font-medium text-blue-600">{selectedPlan?.time} tháng</span>
                                    </div>
                                    <div className="flex justify-between mb-2.5">
                                        <span className="text-gray-500">Ngày hiệu lực</span>
                                        <span className="font-medium">{new Date().toLocaleDateString('vi-VN')}</span>
                                    </div>
                                    <div className="flex justify-between mb-2.5">
                                        <span className="text-gray-500">Tự động gia hạn</span>
                                        <span className="font-medium">{new Date(new Date().getTime() + selectedPlan?.time * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                    <div className="flex justify-between mb-2.5">
                                        <span className="text-gray-500">Đơn giá</span>
                                        <span className="font-medium text-blue-600">{plan?.PricePerMonth?.toLocaleString('vi-VN') || '600.000'}đ</span>
                                    </div>
                                    <div className="flex justify-between mb-2.5">
                                        <span className="text-gray-500">Khuyến mãi</span>
                                        <span className="font-medium">0đ</span>
                                    </div>
                                    <div className="flex justify-between pt-2.5 mt-2.5 border-t border-gray-200 font-semibold">
                                        <span className="text-gray-500">Tổng cộng</span>
                                        <span className="text-blue-600">{((plan?.PricePerMonth * selectedPlan?.time) - (plan?.PricePerMonth * selectedPlan?.time * selectedPlan?.discount / 100))?.toLocaleString('vi-VN') || '600.000'}đ</span>
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
                                className={`w-[130px] h-[80px] border rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all p-2.5 ${selectedPayment === method.id
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

                        <PayPalScriptProvider options={initialOptions}>
                            <PayPalButtons
                                style={{ layout: "vertical" }}
                                createOrder={(data, actions) => {
                                    const total = totalPriceRef.current;
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
                                        createSubscription(transactionId);
                                    });
                                }}
                                onError={(err) => {
                                    console.error("PayPal error:", err);
                                }}
                            />
                        </PayPalScriptProvider>

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