import React from 'react';
import { FaStar, FaPlay, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function MovieDetail(props) {
    const navigate = useNavigate();
    return (
        <div >
            {/* Background Image */}
            <div className='h-[80vh]' >
                <img 
                    className="w-full h-full object-cover" 
                    src="https://4kwallpapers.com/images/walls/thumbs_3t/21607.jpg" 
                    alt="Movie Background" 
                />
            </div>

            {/* Content */}
            <div className="relative container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="w-full md:w-1/3">
                        <img 
                            src="https://static.nutscdn.com/vimg/300-0/579b7f78a14cc7de2c7fa66a04d1c8e4.jpg" 
                            className="w-full rounded-lg shadow-xl" 
                            alt="Movie Poster" 
                        />
                    </div>

                    {/* Movie Info */}
                    <div className="w-full md:w-2/3 text-white">
                        <h1 className="text-4xl font-bold mb-4">Kẻ Vô lại</h1>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center bg-amber-400/20 px-3 py-1 rounded-full">
                                <FaStar className="text-amber-400 mr-1" />
                                <span className="text-amber-400 font-semibold">5.8</span>
                            </div>
                        </div>

                        {/* Movie Details */}
                        <div className="space-y-4 mb-6">
                            <p className="text-gray-300">
                                <span className="font-semibold">Thời lượng:</span> 120 phút
                            </p>
                            <p className="text-gray-300">
                                <span className="font-semibold">Năm phát hành:</span> 2024
                            </p>
                            <p className="text-gray-300">
                                <span className="font-semibold">Thể loại:</span> Hành động, Tội phạm
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <p>Giới thiệu:</p>
                        </div>
                        <p className="text-gray-300 mb-8">
                        Một sát thủ đã giải nghệ tận hưởng cuộc sống yên bình cho đến khi vợ cũ và con trai bất ngờ tìm đến anh trong kỳ nghỉ. Họ bị truy đuổi bởi những kẻ từng là đồng đội của anh trong thế giới ngầm. Không còn lựa chọn nào khác, anh phải đối mặt với quá khứ đẫm máu mà anh từng muốn quên đi.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button onClick={() => navigate(`/play-movie`)} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors">
                                <FaPlay />
                                <span>Xem ngay</span>
                            </button>
                            <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition-colors">
                                <FaPlus />
                                <span>Thêm vào danh sách</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;