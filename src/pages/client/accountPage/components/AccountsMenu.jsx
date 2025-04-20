import { Avatar, Button, styled, CircularProgress, Box, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { ContextAuth } from '../../../../context/AuthProvider';
import { updateDocument } from '../../../../services/firebaseService';
import { FaRegUser } from 'react-icons/fa';
import { GrFavorite } from "react-icons/gr";
import { CiBoxList, CiGift } from "react-icons/ci";
import { Link } from 'react-router-dom';



const MenuItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
}));

function AccountsMenu(props) {
    const { accountLogin } = useContext(ContextAuth)
    const [isLoading, setIsLoading] = useState(false)

   
    return (
        <div className='pt-10 px-10 pb-10 mt-25 mb-10 bg-neutral-800 rounded-lg max-w-md '>
            <div className="flex flex-col items-center">
                <div className="relative mb-6">
                    <Avatar
                        alt="Avatar"
                        src={accountLogin?.imgUrl}
                        sx={{ 
                            width: 120, 
                            height: 120,
                            border: '3px solid #fff',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                        }}
                    />
                    {isLoading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </div>

                <Typography variant="h6" className="text-white mb-4">
                    {accountLogin?.name || accountLogin?.email}
                </Typography>

               

                <div className="w-full space-y-2">
                    <Link to="/main/account" className="w-full">
                        <MenuItem>
                        <FaRegUser className="text-xl text-white" />
                        <Typography className="text-white">Tài khoản</Typography>
                        </MenuItem>
                    </Link>
                    
                    <Link to={"/main/account/rent-movies-library"} className="w-full">
                    <MenuItem>
                        <GrFavorite className="text-xl text-white" />
                        <Typography className="text-white">Quản Lý Kho Phim</Typography>
                    </MenuItem>
                    </Link>

                    <Link to={"/main/account/plan-manage"} className="w-full">
                    <MenuItem>
                        <CiBoxList className="text-xl text-white" />
                        <Typography className="text-white">Quản lý gói đăng ký</Typography>
                    </MenuItem>
                    </Link>

                    <MenuItem>
                        <CiGift className="text-xl text-white" />
                        <Typography className="text-white">Ưu đãi</Typography>
                    </MenuItem>

                    <Button 
                        variant='contained' 
                        color='error' 
                        fullWidth
                        sx={{ 
                            mt: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Đăng xuất
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AccountsMenu;