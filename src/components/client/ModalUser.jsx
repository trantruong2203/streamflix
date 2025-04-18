import React, { useState, useRef } from 'react';
import { Box, Button } from '@mui/material';
import { Avatar } from '@mui/material';
import { Logout, Favorite, List, AccountCircle, ArrowRight } from '@mui/icons-material';
import { useContext } from 'react';
import { ContextAuth } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';

function ModalUser(props) {
    const { accountLogin, logout } = useContext(ContextAuth);
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    return (
        <div className='relative z-10'>
            <button 
                type="button" 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="focus:outline-none"
            >
                <Avatar>
                    <img src={accountLogin?.imgUrl} alt="avatar" />
                </Avatar>
            </button>
            
            <div 
                className={`absolute right-0 top-12 z-50 transition-all duration-300 ease-in-out transform ${
                    isOpen 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Box className="bg-gray-800 rounded-lg shadow-lg w-64">
                    <div className='p-3 border-b border-gray-700'>
                        <p className='text-amber-50 text-md'>Xin chào,</p>
                        <p className='text-white text-xl'>{accountLogin?.useName}</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='p-3 hover:bg-gray-700 transition-all duration-200 cursor-pointer group'>
                            <Link to={'/main/account/favorite'} className='flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    <Favorite className='text-red-500' />
                                    <p className='text-white text-md'>Yêu Thích</p>
                                </div>
                                <ArrowRight className='text-gray-400 group-hover:translate-x-1 transition-transform duration-200' />
                            </Link>
                        </div>
                        <div className='p-3 hover:bg-gray-700 transition-all duration-200 cursor-pointer group'>
                            <Link to={'/main/account/favorite'} className='flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    <List className='text-blue-500' />
                                    <p className='text-white text-md'>Danh sách</p>
                                </div>
                                <ArrowRight className='text-gray-400 group-hover:translate-x-1 transition-transform duration-200' />
                            </Link>
                        </div>
                        <div className='p-3 hover:bg-gray-700 transition-all duration-200 cursor-pointer group'>
                            <Link to={'/main/account'} className='flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    <AccountCircle className='text-green-500' />
                                    <p className='text-white text-md' onClick={() => setIsOpen(false)}>Tài Khoản</p>
                                </div>
                                <ArrowRight className='text-gray-400 group-hover:translate-x-1 transition-transform duration-200' />
                            </Link>
                        </div>
                    </div>
                    <div className="p-3 border-t border-gray-700">
                        <Button 
                            startIcon={<Logout />}
                            fullWidth
                            variant="contained"
                            color="error"
                            onClick={logout}
                            className='hover:bg-red-700 transition-colors duration-200'
                        >
                            Đăng xuất
                        </Button>
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default ModalUser;