import { Badge } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { MoviesContext } from '../../../context/MoviesProvider';
import { data, useNavigate, useParams } from 'react-router-dom';
import { getOjectById } from '../../../services/FunctionRepon';
import { PlansContext } from '../../../context/PlansProvider';

function RentMovie(props) {
    const { id } = useParams();
    const movies = useContext(MoviesContext);
    const plans = useContext(PlansContext);
    const [choosePlan, setChoosePlan] = React.useState(null);
    const [planShow, setPlanShow] = React.useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const movie = getOjectById(movies, id);
        const data = plans.filter((item) => item.level >= getOjectById(plans, movie.planID)?.level);
        setPlanShow(data);
    },[id, movies, plans]);

    const handleChoosePlan = (planId) => {
       choosePlan == id ?  navigate(`/payment/pay`)  : navigate(`/payment/${choosePlan}`); 
    }
    return (
        <div className='min-h-screen py-25 bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className='max-w-md mx-auto px-4'>
                <div className='font-bold text-2xl max-w-xl mx-auto text-center border-b border-black pb-2'>
                    Phương thức thanh toán
                </div>
                <div className='text-center font-semibold text-blue-600 text-sm mt-4'>Bạn đang chọn thuê phim</div>
                <div onClick={() => setChoosePlan(id)} className={`flex justify-between items-center mt-4 bg-white p-4 rounded-lg shadow-md ${choosePlan === id ? "border-2 border-blue-600" : ""}`}>
                    <div className='text-lg font-semibold'>{getOjectById(movies, id)?.name}</div>
                    <div className='text-lg font-semibold'>{parseInt(getOjectById(movies, id)?.rentalPrice).toLocaleString('vi-VN')} <sup>đ</sup></div>
                </div>
                <div className='text-center font-semibold text-blue-600 text-sm mt-4'>Tiết kiệm hơn với combo</div>
                {planShow.sort((a,b) => a.level - b.level).map((item, index) => (
                    <Badge onClick={() => setChoosePlan(item.id)} badgeContent={"Lựa chọn tốt nhất"} key={index} color="primary" className={`rounded-lg cursor-pointer mt-4 ${choosePlan === item.id ? "border-2 border-blue-600" : ""}`}>
                    <div className='p-4 bg-white rounded-lg shadow-md '>
                        <div className='flex justify-between items-center'>
                            <div className='text-lg font-semibold'>Gói {item.title}</div>
                            <div className='text-lg font-semibold'>{parseInt(item.PricePerMonth).toLocaleString('vi-VN')} <sup>đ</sup></div>
                        </div>
                        <div className='text-sm text-gray-600 space-y-1 mt-2'>
                            <p>Thời hạn 1 tháng, gia hạn tự động.</p>
                            <p>Đã bao gồm phim bạn đang chọn thuê.</p>
                            <p>Xem phim không giới hạn với hơn 10.000 giờ nội dung đặc sắc.</p>
                        </div>
                    </div>
                </Badge>       
                ))}
               
                    <button onClick={handleChoosePlan} className='w-full bg-blue-600 text-white p-3 rounded-full mt-4'>Thanh toán</button>
                    <div className='text-center text-sm text-blue-600 mt-4'>Xem kho phim và thanh toán sau</div>
            </div>
            <div className='text-center text-sm text-gray-600 mt-4'>Chất lượng hình ảnh phụ thuộc vào dịch vụ internet và khả năng thiết bị của bạn. Không phải nội dung nào cũng xem được ở chế độ HD (720p), Full HD (1080p), Ultra HD (4K).</div>
        </div>
    );
}

export default RentMovie;