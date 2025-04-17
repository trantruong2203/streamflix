import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { AccountsContext } from "../../context/AccountsProvider";
import { ContextAuth } from "../../context/AuthProvider";
import { useNotification } from "../../context/NotificationProvide";
import { auth, googleProvider } from "../../config/firebaseconfig";
import { signInWithPopup } from "firebase/auth";
import { addDocument } from "../../services/firebaseService";
import FogotPassword from "./FogotPassword";

const inner = { useOrEmail: "", password: "" };

const Login = ({ open, handleClose, handleSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [account, setAccount] = useState(inner);
  const accounts = useContext(AccountsContext);
  const { saveLocal } = useContext(ContextAuth);
  const showNotification = useNotification();
  const [error, setError] = useState("");
  const [forgot, setForgot] = useState(false);
  const handleInput = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const validation = () => {
    const newError = {};
    if (!account.useOrEmail) {
      newError.useOrEmail = "Please enter your email or username";
    }
    if (!account.password) {
      newError.password = "Please enter your password";
    }
    setError(newError);
    return Object.values(newError).every((item) => item === "");
  }

  const handleSubmit = () => {
    if (!validation()) return;
    const foundAccount = accounts.find(acc => (acc.email === account.useOrEmail || acc.useName === account.useOrEmail) && acc.password === account.password);
    if (!foundAccount) {
      showNotification("Invalid email/username or password", "error")
    } else {
      saveLocal("account", foundAccount);
      showNotification("Login success", "success");
      handleClose();
      setAccount(inner);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);

      const user = result.user;
      const existingCustomer = accounts.find(a => a.email === user.email);
      let loggedInCustomer;

      if (!existingCustomer) {
        const newCustomer = {
          useName: user.displayName,
          imgUrl: user.photoURL,
          email: user.email,
        };
        const newAccount = await addDocument('accounts', newCustomer);
        loggedInCustomer = newAccount;
      } else {
        loggedInCustomer = existingCustomer;
      }
      saveLocal("account", loggedInCustomer);
      showNotification("Login success", "success");
      handleClose();
      setAccount(inner);
    } catch (error) {
      showNotification("Login failed", "error");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {forgot ? (<FogotPassword />) : (<Box
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
        }}
        className="bg-white rounded-lg shadow-xl p-6 transform transition-all duration-300"
      >
        <Typography variant="h5" align="center" gutterBottom className="text-3xl font-bold text-center text-amber-400 mb-6">
          Đăng nhập
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Email hoặc tên tài khoản"
          placeholder="e.g. example@mail.com hoặc tên tài khoản của bạn"
          value={account.useOrEmail}
          name="useOrEmail"
          onChange={handleInput}
          error={!!error.useOrEmail}
          helperText={error.useOrEmail}
          required
          className="mb-4"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#ffc600",
                borderWidth: "2px",
                boxShadow: "0 0 10px rgba(255, 198, 0, 0.3)",
              },
              "& fieldset": {
                borderColor: "#d1d5db",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffc600",
                borderWidth: "2px",
              },
              transition: "all 0.3s ease-in-out",
            },
            "& .MuiInputLabel-root": {
              color: "#6b7280",
              "&.Mui-focused": {
                color: "#f59e0b",
              },
            },
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          placeholder="e.g. Example2006"
          value={account.password}
          name="password"
          onChange={handleInput}
          error={!!error.password}
          helperText={error.password}
          required
          className="mb-4"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-amber-500">
                  {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#ffc600",
                borderWidth: "2px",
                boxShadow: "0 0 10px rgba(255, 198, 0, 0.3)",
              },
              "& fieldset": {
                borderColor: "#d1d5db",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffc600",
                borderWidth: "2px",
              },
              transition: "all 0.3s ease-in-out",
            },
            "& .MuiInputLabel-root": {
              color: "#6b7280",
              "&.Mui-focused": {
                color: "#f59e0b",
              },
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <a onClick={() => setForgot(true)} href="#" variant="body2" className="text-amber-400 hover:text-amber-500 transition-colors duration-200 text-sm font-medium">
            Quên mật khẩu?
          </a>
        </Box>

        <Button
          onClick={handleSubmit}
          fullWidth
          type="submit"
          variant="contained"
          sx={{ 
            mt: 3,
            bgcolor: "#f59e0b", 
            "&:hover": { bgcolor: "#d97706" },
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
          className="text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Đăng nhập
        </Button>

        <Typography align="center" sx={{ mt: 2 }} className="text-gray-600 text-sm">
          Không có tài khoản? <a className="text-amber-400 hover:text-amber-500 cursor-pointer font-medium transition-colors duration-200" onClick={handleSignup}>Đăng ký</a>
        </Typography>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <Typography variant="body2" className="mx-4 text-gray-500">Hoặc</Typography>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <Button
          fullWidth
          variant="outlined"
          sx={{ 
            mt: 1,
            borderColor: "#f59e0b",
            color: "#f59e0b",
            "&:hover": { 
              bgcolor: "rgba(245, 158, 11, 0.1)", 
              borderColor: "#d97706" 
            },
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
          startIcon={<FaGoogle />}
          onClick={signInWithGoogle}
          className="font-semibold py-2.5 px-4 rounded-lg transition-all duration-300"
        >
          Tiếp tục với Google
        </Button>
      </Box>)}

    </Modal>
  );
};

export default Login;
