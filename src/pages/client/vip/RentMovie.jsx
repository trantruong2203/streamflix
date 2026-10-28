import React, { useContext, useEffect } from 'react';
import { MoviesContext } from '../../../context/MoviesProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { getOjectById } from '../../../services/FunctionRepon';
import { PlansContext } from '../../../context/PlansProvider';
import { FaTicketAlt, FaFilm } from 'react-icons/fa';

function RentMovie(props) {
    const { id } = useParams();
    const movies = useContext(MoviesContext);
    const plans = useContext(PlansContext);
    const [choosePlan, setChoosePlan] = React.useState(null);
    const [planShow, setPlanShow] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const movie = getOjectById(movies, id);
        if (movie) {
            const currentPlan = getOjectById(plans, movie.planID);
            const data = currentPlan ? plans.filter((item) => item.level >= currentPlan.level) : [];
            setPlanShow(data);
        } else {
            setPlanShow([]);
        }
    }, [id, movies, plans]);

    const movie = getOjectById(movies, id);

    const handleConfirm = () => {
        if (!choosePlan) return;
        choosePlan === id ? navigate(`/payment/pay/${id}`) : navigate(`/payment/${choosePlan}`);
    };

    return (
        <div className='min-h-screen pt-24 pb-16 bg-stone-950 text-stone-100'>
            <div className='max-w-md mx-auto px-4'>
                <div className="text-center mb-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-stone-900 text-amber-400 border border-amber-500/30 mb-2">
                        <FaTicketAlt className="text-[9px]" />
                        TICKET BOX
                    </span>
                    <h1 className='font-bold text-2xl font-serif text-stone-100 tracking-tight'>
                        Thuê Phim Lẻ Trực Tuyến
                    </h1>
                </div>

                {/* Movie rental ticket card */}
                <div 
                    onClick={() => setChoosePlan(id)} 
                    className={`p-4 rounded-xl cursor-pointer border transition-all shadow-md ${
                        choosePlan === id 
                            ? 'bg-stone-900 border-amber-500 shadow-amber-500/10' 
                            : 'bg-stone-900/60 border-stone-800 hover:border-amber-500/40'
                    }`}
                >
                    <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1">
                        Gói thuê phim đơn lẻ
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='text-base font-semibold text-stone-200 truncate pr-2'>{movie?.name}</div>
                        <div className='text-lg font-bold font-mono text-amber-400 whitespace-nowrap'>
                            {parseInt(movie?.rentalPrice || 0).toLocaleString('vi-VN')}đ
                        </div>
                    </div>
                    <p className="text-xs text-stone-400 font-mono mt-1">Thời hạn xem trong 48 giờ sau khi thanh toán.</p>
                </div>

                {/* Upsell to monthly plans */}
                {planShow.length > 0 && (
                    <div className="mt-8">
                        <div className='text-xs font-mono uppercase tracking-widest text-stone-400 mb-3 text-center'>
                            Hoặc nâng cấp gói hội viên tháng (Tiết kiệm hơn)
                        </div>

                        <div className="space-y-3">
                            {planShow.sort((a,b) => a.level - b.level).map((item) => (
                                <div 
                                    key={item.id}
                                    onClick={() => setChoosePlan(item.id)}
                                    className={`p-4 rounded-xl cursor-pointer border transition-all shadow-md ${
                                        choosePlan === item.id 
                                            ? 'bg-stone-900 border-amber-500 shadow-amber-500/10' 
                                            : 'bg-stone-900/60 border-stone-800 hover:border-amber-500/40'
                                    }`}
                                >
                                    <div className='flex justify-between items-center'>
                                        <div className='text-base font-semibold text-stone-200 font-serif'>Gói {item.title}</div>
                                        <div className='text-lg font-bold font-mono text-amber-400'>
                                            {parseInt(item.PricePerMonth).toLocaleString('vi-VN')}đ
                                            <span className="text-xs text-stone-400 font-sans font-normal">/tháng</span>
                                        </div>
                                    </div>
                                    <div className='text-xs text-stone-400 space-y-0.5 mt-2 font-light'>
                                        <p>• Thời hạn 1 tháng, xem không giới hạn toàn bộ kho phim.</p>
                                        <p>• Bao gồm cả bộ phim bạn đang chọn thuê.</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Continue button */}
                <div className='mt-8'>
                    <button
                        onClick={handleConfirm}
                        disabled={!choosePlan}
                        className={`w-full py-3 rounded-md font-mono uppercase tracking-wider text-xs font-bold transition-all shadow-lg cursor-pointer ${
                            choosePlan 
                                ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-500/20' 
                                : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                        }`}
                    >
                        Tiếp tục thanh toán →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RentMovie;
