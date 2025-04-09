import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { IoMail, IoNotifications } from "react-icons/io5";
import ModalAccount from './ModalAccount';
function Header(props) {
    return (
        <div>
            <div className='flex justify-between p-3'>
                <div className='items-center'>
                    <p className='font-light text-3xl'>GOOD MORNING <span className='text-3xl font-bold'>TRAN TRUONG</span></p>
                    <p className='text-lg font-light'>Watch Anytime, Enjoy Anywhere!</p>
                </div>
                <div className='flex gap-3 ml-auto items-center'>
                    <div > <FaSearch className='text-2xl' /> </div>
                    <IoMail className='text-2xl' />
                    <IoNotifications className='text-2xl' />
                    <ModalAccount />
                    
                </div>
            </div>
        </div>
    );
}

export default Header;