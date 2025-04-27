import React from 'react';
import { Box, Modal, Typography, TextField, Button, Avatar, Input, InputAdornment, IconButton, Select, MenuItem, Paper, Chip } from '@mui/material';
import { useNotification } from '../../../context/NotificationProvide';
import { addDocument, updateDocument } from '../../../services/firebaseService';
import { VisibilityOff, Visibility, PhotoCamera } from '@mui/icons-material';

function ModalUserPage({ open, setOpen, user, setUser, errors, setErrors }) {
    const showNotification = useNotification();
    const handleClose = () => setOpen(false);

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const validation = () => {
        const newErrors = {};
        if (!user?.useName) {
            newErrors.useName = "Tên không được để trống";
        }
        if (!user?.email) {
            newErrors.email = "Email không được để trống";
        }
        if (!user?.password && !user?.id) {
            newErrors.password = "Mật khẩu không được để trống";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async () => {
        if (!validation()) return;

        if (user.id) {
            await updateDocument("accounts",user);
        } else {
            await addDocument("accounts", user);
        }
        showNotification("Cập nhật người dùng thành công", "success");
        handleClose();
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0]; // Lấy file đầu tiên từ input
        if (file) {
          const result = new FileReader(); // Tạo đối tượng FileReader để đọc file
          result.readAsDataURL(file); // Đọc file dưới dạng base64
          result.onload = () => {
            setUser({ ...user, imgUrl: result.result }); // Lưu ảnh vào state
          }
        }
      };

    return (
        <Modal open={open} onClose={handleClose}>
            <Paper
                elevation={3}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: "white",
                    borderRadius: 2,
                    p: 4,
                }}
            >
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {user?.id ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        fullWidth
                        label="Tên"
                        variant="outlined"
                        name="useName"
                        value={user?.useName || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ backgroundColor: "#f5f5f5" }}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        name="email"
                        type="email"
                        value={user?.email || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ backgroundColor: "#f5f5f5" }}
                    />
                    {user?.password ?
                        (<TextField
                            fullWidth
                            label="Mật khẩu"
                            variant="outlined"
                            name="password"
                            type="password"
                            value={user?.password || ''}
                            onChange={handleInput}
                            error={!!errors.password}
                            helperText={errors.password}
                            required={!user?.id}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton size="small">
                                            <VisibilityOff />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />)
                    : (
                        <Chip 
                            label="Google Sign-in" 
                            size="small"
                            variant="outlined"
                        />
                    )}


                    <Select
                        fullWidth
                        value={user?.role || 'user'}
                        onChange={handleInput}
                        name="role"
                        label="Vai trò"
                        variant="outlined"
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="moderator">Moderator</MenuItem>
                    </Select>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                border: '2px solid #1976d2',
                                cursor: 'pointer'
                            }}
                            src={user?.imgUrl}
                        />
                        <Button
                            variant="outlined"
                            startIcon={<PhotoCamera />}
                            component="label"
                        >
                            Tải ảnh lên
                            <input hidden accept="image/*" type="file" onChange={handleFileUpload} />
                        </Button>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            sx={{ minWidth: 100 }}
                        >
                            Hủy
                        </Button>
                        <Button
                            variant="contained"
                            onClick={onSubmit}
                            sx={{ minWidth: 100 }}
                        >
                            {user?.id ? "Cập nhật" : "Thêm"}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Modal>
    );
}

export default ModalUserPage;