import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Avatar, CircularProgress, styled, Box, Typography, FormControlLabel, Checkbox, FormControl, FormLabel, RadioGroup, Radio } from '@mui/material';
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
    const { accountLogin, saveLocal } = useContext(ContextAuth);
    const [account, setAccount] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const notification = useNotification()
    useEffect(() => {
     setAccount(accountLogin);
    }, [accountLogin]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const result = new FileReader();
            result.readAsDataURL(file);
            result.onload = () => {
                setAccount({ ...account, imgUrl: result.result });
            }
        }
    };

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            await updateDocument("accounts",account);
            notification("Cập nhật thông tin tài khoản thành công", "success");
            saveLocal("account", account);
        } catch (error) {
            notification("Có lỗi xảy ra khi cập nhật ảnh đại diện", "error")
        } finally {
            setIsLoading(false);
        }
    }

    const handleInput = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    };

    return (
        <Box className='pt-10 px-10 pb-10 mt-25 mb-10 mx-10 w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex flex-col gap-6 shadow-xl'>
            <Typography variant="h4" className='text-center font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                Tài Khoản
            </Typography>
            <Typography variant="subtitle1" className='text-gray-100 text-center'>
                Cập nhật thông tin tài khoản
            </Typography>

            <Box className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
                <Box className='flex flex-col gap-6'>
                    <TextField
                        label="Email"
                        value={account?.email}
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
                                color: 'rgba(255, 255, 255, 0.9)',
                            },
                            '& .MuiInputBase-input': {
                                color: 'rgba(255, 255, 255, 0.95)',
                            },
                        }}
                    />

                    <TextField
                        label="Tên hiển thị"
                        value={account?.useName}
                        onChange={handleInput}
                        fullWidth
                        disabled
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
                                color: 'rgba(255, 255, 255, 0.9)',
                            },
                            '& .MuiInputBase-input': {
                                color: 'rgba(255, 255, 255, 0.95)',
                            },
                        }}
                    />
                    <TextField
                        label="Số điện thoại"
                        value={account?.phoneNumber || ""}
                        name="phoneNumber"
                        type='text'
                        onChange={handleInput}
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
                                color: 'rgba(255, 255, 255, 0.9)',
                            },
                            '& .MuiInputBase-input': {
                                color: 'rgba(255, 255, 255, 0.95)',
                            },
                        }}
                    />

                    <FormControl sx={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                        <FormLabel id="gender" sx={{ color: "rgba(255, 255, 255, 0.95)" }}>Giới tính:</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="gender"
                            onChange={handleInput}
                            sx={{ flexDirection: 'row', gap: 2 }}
                        >
                            <FormControlLabel value="male" sx={{ color: "rgba(255, 255, 255, 0.95)" }} control={<Radio />} label="Nam" />
                            <FormControlLabel value="female" sx={{ color: "rgba(255, 255, 255, 0.95)" }} control={<Radio />} label="Nữ" />
                            <FormControlLabel value="other" sx={{ color: "rgba(255, 255, 255, 0.95)" }} control={<Radio />} label="Khác" />
                        </RadioGroup>
                    </FormControl>
                </Box>

                <Box className="flex flex-col items-center gap-6">
                    <Box className="relative">
                        <Avatar
                            alt="Avatar"
                            src={account?.imgUrl}
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