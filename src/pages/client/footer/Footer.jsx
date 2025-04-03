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
        <footer className='bg-gradient-to-r from-slate-300 to-slate-500 p-6 md:p-8'>
            <div className='container mx-auto '>
                <div className='flex flex-col md:flex-row  gap-6 md:gap-10 items-center'>
                    <div className='w-1/4 max-w-[200px]'>
                        <img src={logo} alt="StreamFlix Logo" className='w-full h-auto' />
                    </div>
                    <div className='flex gap-6 md:gap-8 text-3xl md:text-4xl'>
                        {socialLinks.map((social, index) => (
                            <a 
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='hover:text-violet-600 transition-colors duration-300'
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className='flex flex-wrap  gap-4 md:gap-10  mt-6 font-bold text-sm md:text-base'>
                    {menuLinks.map((link, index) => (
                        <Link 
                            key={index}
                            to={link.url}
                            className='hover:text-violet-600 transition-colors duration-300'
                        >
                            {link.text}
                        </Link>
                    ))}
                </div>

                <div className='text-sm  mt-6 max-w-3xl '>
                    <p className='mb-2'>
                        Stream Flix – Phim hay cả rổ - Trang xem phim online chất lượng cao miễn phí Vietsub, 
                        thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, 
                        phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan, Nhật Bản, 
                        Âu Mỹ… đa dạng thể loại. Khám phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!
                    </p>
                    <p>© {new Date().getFullYear()} Stream Flix</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;