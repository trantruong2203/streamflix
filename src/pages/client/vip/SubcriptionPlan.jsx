import { Box } from '@mui/material';
import React, { useContext, useMemo, useState } from 'react';
import { PlansContext } from '../../../context/PlansProvider';
import { GoCheck, GoX } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import { FeatureContext } from '../../../context/FeatureProvider';
import { FaCrown, FaTicketAlt } from 'react-icons/fa';

const PlanCard = ({ plan, getDescription, isSelected, onSelect }) => {
    return (
        <div
            onClick={() => onSelect(plan.id)}
            className={`p-6 sm:p-7 rounded-2xl shadow-xl mb-6 flex-1 min-w-[280px] max-w-[340px] 
                hover:scale-103 transition-all duration-300 border-2 cursor-pointer
                ${isSelected 
                    ? 'border-amber-500 bg-stone-900 shadow-amber-500/10' 
                    : 'border-stone-800/90 bg-stone-900/70 hover:border-amber-500/50'}
                relative overflow-hidden group`}
        >
            {/* Top Badge for high tier plans */}
            {plan.level >= 3 && (
                <div className="absolute top-0 right-0 bg-amber-500 text-stone-950 text-[10px] font-mono font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    Đề xuất
                </div>
            )}

            {/* Content */}
            <div className='relative z-10'>
                <div className="flex items-center gap-2 mb-2">
                    <FaCrown className={isSelected ? "text-amber-400" : "text-stone-500"} />
                    <h2 className='text-lg font-bold font-serif text-stone-100 uppercase tracking-wide'>{plan.title}</h2>
                </div>

                <div className='mb-6 border-b border-stone-800 pb-5'>
                    <p className='text-3xl font-bold font-mono text-amber-400'>
                        {(plan.PricePerMonth).toLocaleString('vi-VN')}đ
                        <span className='text-xs font-normal font-sans text-stone-400 ml-1'>/tháng</span>
                    </p>
                    <p className="text-[11px] text-stone-400 font-mono mt-1">Cấp độ hội viên: Level {plan.level}</p>
                </div>

                <div className='text-stone-300 space-y-3 text-xs sm:text-sm font-sans'>
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
                {planFeatures.map((feature, index) => (
                    <div key={index} className='flex items-start gap-2.5'>
                        {feature.available === "Yes"
                            ? <GoCheck className='text-amber-400 mt-0.5 flex-shrink-0' size={16} />
                            : <GoX className='text-stone-600 mt-0.5 flex-shrink-0' size={16} />}
                        <span className={feature.available === "Yes" ? "text-stone-200" : "text-stone-500 line-through"}>
                            {feature.description}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='min-h-screen pt-24 pb-16 bg-stone-950 text-stone-100'>
            <div className='max-w-6xl mx-auto px-4'>
                <div className="text-center mb-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-stone-900 text-amber-400 border border-amber-500/30 mb-2">
                        <FaTicketAlt className="text-[9px]" />
                        STREAMFLIX VIP PASS
                    </span>
                    <h1 className='text-3xl sm:text-4xl font-bold font-serif text-stone-100 tracking-tight'>
                        Gia Nhập Hội Viên StreamFlix
                    </h1>
                    <p className='text-stone-400 text-xs sm:text-sm mt-1 max-w-lg mx-auto font-light'>
                        Trải nghiệm không giới hạn kho phim chiếu rạp, chất lượng 4K Ultra HD và âm thanh vòm sống động
                    </p>
                </div>

                <div className='flex flex-wrap gap-6 justify-center mb-8'>
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
                    <Link 
                        to={selectedPlanId ? `/payment/${selectedPlanId}` : '#'}
                        className={`px-12 py-3 rounded-md font-mono uppercase tracking-wider text-xs font-bold transition-all shadow-lg ${
                            selectedPlanId 
                                ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 cursor-pointer shadow-amber-500/20' 
                                : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                        }`}
                    >
                        {selectedPlanId ? 'Tiếp tục thanh toán →' : 'Vui lòng chọn 1 gói'}
                    </Link>
                </div>

                <div className='text-center mt-6'>
                    <Link to="/main" className='text-stone-400 hover:text-amber-400 text-xs font-mono transition-colors'>
                        Xem kho phim và đăng ký gói sau →
                    </Link>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 p-6 rounded-xl bg-stone-900/40 border border-stone-800/80 text-stone-400 text-xs leading-relaxed font-light'>
                    <p>
                        Phí thuê bao sẽ được thanh toán tự động theo chu kỳ bạn chọn. Bạn có thể huỷ gia hạn bất cứ lúc nào trong mục Quản lý tài khoản mà không mất phí phạt.
                    </p>
                    <p>
                        Chất lượng hình ảnh 4K HDR và âm thanh vòm Dolby phụ thuộc vào gói đăng ký và khả năng phần cứng của thiết bị hiển thị.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SubcriptionPlan;
