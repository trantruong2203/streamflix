import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Avatar } from '@mui/material';
import { Logout, Favorite, List, AccountCircle, ArrowRight } from '@mui/icons-material';
import { useContext } from 'react';
import { ContextAuth } from '../../context/AuthProvider';

function ModalUser(props) {
    const { accountLogin, logout } = useContext(ContextAuth);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='relative'>
            <button type="button" onClick={handleClick}>
                <Avatar>
                <img src={accountLogin?.imgUrl} />
                </Avatar>
            </button>
            
            {isOpen && (
                <div className="absolute right-0 top-12 z-50">
                    <Box className="bg-gray-800 rounded-lg shadow-lg w-64">
                        <div className='p-3 border-b border-gray-700'>
                            <p className='text-amber-50 text-md'>Xin chào,</p>
                            <p className='text-white text-xl'>{accountLogin?.useName}</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='p-3 hover:bg-gray-700 transition-all duration-200 cursor-pointer group'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <Favorite className='text-red-500' />
                                        <p className='text-white text-md'>Yêu Thích</p>
                                    </div>
                                    <ArrowRight className='text-gray-400 group-hover:translate-x-1 transition-transform duration-200' />
                                </div>
                            </div>
                            <div className='p-3 hover:bg-gray-700 transition-all duration-200 cursor-pointer group'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <List className='text-blue-500' />
                                        <p className='text-white text-md'>Danh sách</p>
                                    </div>
                                    <ArrowRight className='text-gray-400 group-hover:translate-x-1 transition-transform duration-200' />
                                </div>
                            </div>
                            <div className='p-3 hover:bg-gray-700 transition-all duration-200 cursor-pointer group'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <AccountCircle className='text-green-500' />
                                        <p className='text-white text-md'>Tài Khoản</p>
                                    </div>
                                    <ArrowRight className='text-gray-400 group-hover:translate-x-1 transition-transform duration-200' />
                                </div>
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
            )}
        </div>
    );
}

export default ModalUser;