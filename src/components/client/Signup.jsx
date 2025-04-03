import React, { useState, useContext } from "react";
import {
    Box,
    Button,
    Modal,
    Typography,
    TextField,
    IconButton,
    InputAdornment,
    CircularProgress,
    Fade,
} from "@mui/material";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { useNotification } from "../../context/NotificationProvide";
import { addDocument } from "../../services/firebaseService";
import { ROLES } from "../../utils/Contants";
import { AccountsContext } from "../../context/AccountsProvider";

const inner = {
    useName: "",
    imgUrl: "",
    password: "",
    confirmPassword: "",
    email: "",
    role: ROLES.USER,
}

const Signup = ({ open, handleClose, handleLogin }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [user, setUser] = useState(inner);
    const [loading, setLoading] = useState(false);
    const showNotification = useNotification();
    const [errors, setErrors] = useState({});
    const accounts = useContext(AccountsContext);

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const validation = () => {
        const newErrors = {};
        if (!user.useName) {
            newErrors.useName = "Username is required";
        }
        const checkUserName = accounts.find(e => e.useName == user.useName);
        if (checkUserName) {
            newErrors.useName = "Username already exists";
        }
        if (!user.email) {
            newErrors.email = "Email is required";
        }
        const checkEmail = accounts.find(e => e.email == user.email);
        if (checkEmail) {
            newErrors.email = "Email already exists";
        }
        if (!user.password) {
            newErrors.password = "Password is required";
        }
        if (user.confirmPassword !== user.password) {
            newErrors.confirmPassword = "Confirm Password does not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length > 0;
    }

    const onSubmit = async () => {
        const {confirmPassword, ...account} = user; // Tách confirmPassword ra khỏi user
        if (validation()) return; // Nếu có lỗi, không gửi dữ liệu  
           await addDocument("accounts", account);
            showNotification("Signup success !!!", "success");
            handleClose();
    };


    return (
        <Modal 
            open={open} 
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                        }
                    }}
                >
                    <Typography 
                        variant="h5" 
                        align="center" 
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                            mb: 3
                        }}
                    >
                        Đăng Ký
                    </Typography>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Tên đăng nhập"
                        placeholder="Nhập tên đăng nhập"
                        required
                        name="useName"
                        value={user.useName}
                        onChange={handleInput}
                        helperText={errors.useName}
                        error={!!errors.useName}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: "primary.main",
                                },
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        placeholder="example@mail.com"
                        required
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInput}
                        helperText={errors.email}
                        error={!!errors.email}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: "primary.main",
                                },
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Mật khẩu"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        required
                        name="password"
                        value={user.password}
                        onChange={handleInput}
                        helperText={errors.password}
                        error={!!errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton 
                                        onClick={() => setShowPassword(!showPassword)}
                                        sx={{
                                            "&:hover": {
                                                color: "primary.main",
                                            }
                                        }}
                                    >
                                        {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: "primary.main",
                                },
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Xác nhận mật khẩu"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        required
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleInput}
                        helperText={errors.confirmPassword}
                        error={!!errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton 
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        sx={{
                                            "&:hover": {
                                                color: "primary.main",
                                            }
                                        }}
                                    >
                                        {showConfirmPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&:hover fieldset": {
                                    borderColor: "primary.main",
                                },
                            },
                        }}
                    />

                    <Button 
                        onClick={onSubmit} 
                        fullWidth 
                        variant="contained" 
                        sx={{ 
                            mt: 2,
                            py: 1.5,
                            position: "relative",
                            "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            },
                            transition: "all 0.3s ease-in-out"
                        }}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress 
                                size={24} 
                                sx={{ 
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    marginTop: "-12px",
                                    marginLeft: "-12px",
                                }}
                            />
                        ) : (
                            "Đăng Ký"
                        )}
                    </Button>

                    <Typography align="center" sx={{ mt: 2 }}>
                        Đã có tài khoản?{" "}
                        <Button 
                            variant="text" 
                            onClick={handleLogin}
                            sx={{
                                "&:hover": {
                                    color: "primary.main",
                                    textDecoration: "underline",
                                }
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </Typography>

                    <Typography align="center" sx={{ mt: 2, color: "text.secondary" }}>
                        Hoặc
                    </Typography>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ 
                            mt: 2, 
                            bgcolor: "red", 
                            color: "white",
                            "&:hover": {
                                bgcolor: "darkred",
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            },
                            transition: "all 0.3s ease-in-out"
                        }}
                        startIcon={<FaGoogle />}
                    >
                        Đăng nhập với Google
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
};

export default Signup;
