import { Box } from '@mui/material';
import React, { useContext, useMemo, useState } from 'react';
import { PlansContext } from '../../../context/PlansProvider';
import { GoCheck, GoX } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import { FeatureContext } from '../../../context/FeatureProvider';
import { DisabledByDefault } from '@mui/icons-material';

const PlanCard = ({ plan, getDescription, isSelected, onSelect }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => onSelect(plan.id)}
            className={`bg-white p-6 rounded-2xl shadow-lg mb-8 flex-1 min-w-[280px] max-w-[320px] 
                hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2
                ${isSelected ? 'border-blue-500' : 'border-gray-100'}
                relative overflow-hidden group cursor-pointer`}
        >
            {/* Gradient overlay */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 
                group-hover:opacity-100 transition-opacity duration-300'></div>

            {/* Content */}
            <div className='relative z-10'>
                <h2 className='text-lg font-bold mb-4 text-gray-800'>{plan.title}</h2>
                <div className='text-gray-700 mb-4 border-b border-gray-200 pb-4'>
                    <p className='text-2xl font-bold text-blue-600'>{(plan.PricePerMonth).toLocaleString('vi-VN')}đ
                        <span className='text-xs font-normal text-gray-500 ml-1'>/tháng</span>
                    </p>
                </div>
                <div className='text-gray-600 space-y-3 text-sm'>
                    {getDescription(plan)}
                </div>
            </div>
        </div>
    );
};

function SubcriptionPlan() {
    const plans = useContext(PlansContext);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const features = useContext(FeatureContext);
    const sortedPlans = useMemo(() => {
        return [...plans].sort((a, b) => a.level - b.level);
    }, [plans]);

    const handleSelectPlan = (planId) => {
        setSelectedPlanId(planId === selectedPlanId ? null : planId);
    };

    const chooseDescription = (plan) => {
        const planFeatures = features.filter(feature => feature.plan == plan.id);
        return (

            <div className='space-y-3'>
                {
                    planFeatures.map((feature, index) => (
                        <div key={index} className='flex items-center gap-2'>
                            {feature.available == "Yes"
                                ? <GoCheck className='text-green-500' size={16} />
                                : <GoX className='text-red-500' size={16} />}
                            <span>{feature.description}</span>
                        </div>
                    ))
                }
            </div>
        );
    };

    return (
        <div className='min-h-screen py-25 bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className='max-w-7xl mx-auto px-4'>
                <h1 className='text-2xl font-bold text-center text-gray-800 mb-2'>
                    Chọn gói Stream Flix
                </h1>
                <p className='text-gray-600 text-center text-sm mb-8'>
                    Huỷ bất cứ lúc nào
                </p>
                <div className='flex flex-wrap gap-6 justify-center'>
                    {sortedPlans.map(plan => (
                        <PlanCard
                            key={plan.id}
                            plan={plan}
                            getDescription={chooseDescription}
                            isSelected={plan.id === selectedPlanId}
                            onSelect={handleSelectPlan}
                        />
                    ))}
                </div>
                <div className='flex justify-center'>
                    <Link to={`/payment/${selectedPlanId}`}
                        className={` text-white px-10 py-2 rounded-full cursor-pointer hover:bg-amber-300 transition-all  ${selectedPlanId ? 'bg-amber-500' : 'bg-gray-300'}`}>
                        {selectedPlanId ? 'Tiếp tục' : 'Chọn gói'}
                    </Link>
                </div>
                <div className='text-blue-600 text-center text-sm mt-8 hover:underline cursor-pointer hover:text-blue-300 transition-all duration-300'>
                    Xem kho phim và đăng ký gói sau
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-12'>
                    <p className='text-gray-600 text-sm'>
                        Phí thuê bao sẽ trả bằng phương thức thanh toán bạn đã nhập khi xác nhận đăng ký gói. Thuê bao tự động gia hạn trừ phi bạn hủy thuê bao ít nhất 24 giờ trước khi hết hạn. Tài khoản của bạn sẽ bị tính phí gia hạn trong vòng 24 giờ trước khi hết hạn. Bạn có thể quản lý và hủy thanh toán tại mục Phương thức thanh toán ở trang Tài khoản.
                    </p>
                    <p className='text-gray-600 text-sm'>
                        Chất lượng hình ảnh phụ thuộc vào dịch vụ internet và khả năng thiết bị của bạn. Không phải nội dung nào cũng xem được ở chế độ HD (720p), Full HD (1080p), Ultra HD (4K).
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SubcriptionPlan;