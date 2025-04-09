import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../../assets/DeWatermark.ai_1742354548201-removebg-preview.png'

function Footer() {
    const socialLinks = [
        { icon: <FaFacebook />, url: 'https://www.facebook.com/truong.trandinh.5/' },
        { icon: <FaInstagram />, url: 'https://instagram.com' },
        { icon: <FaTwitter />, url: 'https://twitter.com' },
        { icon: <FaYoutube />, url: 'https://youtube.com' }
    ];

    const menuLinks = [
        { text: 'Hỏi Đáp', url: '/faq' },
        { text: 'Chính sách bảo mật', url: '/privacy' },
        { text: 'Điều khoản sử dụng', url: '/terms' },
        { text: 'Giới thiệu', url: '/about' },
        { text: 'Liên hệ', url: '/contact' }
    ];

    return (
        <footer className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8 md:p-12'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
                    {/* Logo và Social Links */}
                    <div className='flex flex-col items-center md:items-start space-y-4'>
                        <div className='w-40'>
                            <img src={logo} alt="StreamFlix Logo" className='w-full h-auto' />
                        </div>
                        <div className='flex space-x-4 text-2xl'>
                            {socialLinks.map((social, index) => (
                                <a 
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='hover:text-blue-400 transform hover:scale-110 transition-all duration-300'
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Menu Links */}
                    <div className='flex flex-col items-center md:items-start space-y-3'>
                        <h3 className='text-xl font-bold mb-2 text-blue-400'>Liên kết nhanh</h3>
                        {menuLinks.map((link, index) => (
                            <Link 
                                key={index}
                                to={link.url}
                                className='hover:text-blue-400 transition-colors duration-300'
                            >
                                {link.text}
                            </Link>
                        ))}
                    </div>

                    {/* Description */}
                    <div className='text-center md:text-left'>
                        <h3 className='text-xl font-bold mb-2 text-blue-400'>Về StreamFlix</h3>
                        <p className='text-gray-300 text-sm leading-relaxed'>
                            Stream Flix – Phim hay cả rổ - Trang xem phim online chất lượng cao miễn phí Vietsub, 
                            thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, 
                            phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan, Nhật Bản, 
                            Âu Mỹ… đa dạng thể loại. Khám phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!
                        </p>
                    </div>
                </div>

                <div className='border-t border-gray-700 pt-6 text-center'>
                    <p className='text-gray-400'>© {new Date().getFullYear()} Stream Flix. Tất cả quyền được bảo lưu.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;