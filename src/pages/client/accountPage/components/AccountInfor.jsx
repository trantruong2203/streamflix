import React, { useState, useContext } from 'react';
import { TextField, Button, Avatar, CircularProgress, styled, Box, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { ContextAuth } from '../../../../context/AuthProvider';
import { updateDocument } from '../../../../services/firebaseService';
import { useNotification } from '../../../../context/NotificationProvide';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const StyledButton = styled(Button)(({ theme }) => ({
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
}));

function AccountInfor(props) {
    const { accountLogin } = useContext(ContextAuth)
    const [email] = useState(accountLogin?.email);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const notification = useNotification()


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const result = new FileReader();
            result.readAsDataURL(file);
            result.onload = () => {
                setAvatar(result.result);
            }
        }
    };

    const onSubmit = async () => {
        if (!avatar) return;
        setIsLoading(true);
        try {
            await updateDocument("accounts",
                {
                    id: accountLogin.id,
                    email: accountLogin?.email,
                    useName: name,
                    imgUrl: avatar
                }
            );
            notification("Cập nhật thông tin tài khoản thành công", "success")
        } catch (error) {
            notification("Có lỗi xảy ra khi cập nhật ảnh đại diện", "error")
        } finally {
            setIsLoading(false);
        }
    }


    const handleInputName = (e) => {
        setName(e.target.value);
    }

    return (
        <Box className='pt-10 px-10 pb-10 mt-25 mb-10 mx-10 w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex flex-col gap-6 shadow-xl'>
            <Typography variant="h4" className='text-center font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                Tài Khoản
            </Typography>
            <Typography variant="subtitle1" className='text-gray-300 text-center'>
                Cập nhật thông tin tài khoản
            </Typography>

            <Box className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
                <Box className='flex flex-col gap-6'>
                    <TextField
                        label="Email"
                        value={email}
                        disabled
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                },
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '8px',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'rgba(255, 255, 255, 0.7)',
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                            },
                        }}
                    />

                    <TextField
                        label="Tên hiển thị"
                        value={name || accountLogin?.useName}
                        onChange={handleInputName}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                },
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '8px',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'rgba(255, 255, 255, 0.7)',
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                            },
                        }}
                    />
                </Box>

                <Box className="flex flex-col items-center gap-6">
                    <Box className="relative">
                        <Avatar
                            alt="Avatar"
                            src={avatar || accountLogin?.imgUrl}
                            sx={{
                                width: 150,
                                height: 150,
                                border: '4px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    border: '4px solid rgba(255, 255, 255, 0.3)',
                                }
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
                                    color: 'white'
                                }}
                            />
                        )}
                    </Box>

                    <Box className="flex gap-4">
                        <StyledButton
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            disabled={isLoading}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                }
                            }}
                        >
                            Chọn ảnh
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleFileUpload}
                                accept="image/*"
                            />
                        </StyledButton>
                    </Box>
                </Box>
            </Box>

            <Box className="flex justify-center mt-6">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    sx={{
                        minWidth: '200px',
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                        }
                    }}
                >
                    Cập Nhật
                </Button>
            </Box>
        </Box>
    );
}

export default AccountInfor;