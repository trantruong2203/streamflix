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

const inner = {useOrEmail: "", password: ""};

const Login = ({ open, handleClose, handleSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [account, setAccount] = useState(inner);
  const accounts = useContext(AccountsContext);
  const { saveLocal } = useContext(ContextAuth);
  const showNotification = useNotification();
  const [error, setError] = useState("");
 
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
    const foundAccount = accounts.find( acc => (acc.email === account.useOrEmail || acc.useName === account.useOrEmail) && acc.password === account.password);
    if (!foundAccount) {
      showNotification("Invalid email/username or password", "error")
    }else {
      saveLocal("account",foundAccount);
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
      saveLocal("account",loggedInCustomer);
      showNotification("Login success", "success");
      handleClose();
      setAccount(inner);
    } catch (error) {
      showNotification("Login failed", "error");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
        }}
        className="bg-white rounded-lg shadow-xl p-6 transform transition-all duration-300 hover:scale-105"
      >
        <Typography variant="h5" align="center" gutterBottom className="text-2xl font-bold text-gray-800 mb-6">
          Login
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Email or Username"
          placeholder="e.g. example@mail.com or your username"
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
                borderColor: "#2196F3",
                borderWidth: "2px",
                boxShadow: "0 0 10px rgba(33, 150, 243, 0.3)",
              },
              transition: "all 0.3s ease-in-out",
            }
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
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
                <IconButton onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-blue-500">
                  {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#2196F3",
                borderWidth: "2px",
                boxShadow: "0 0 10px rgba(33, 150, 243, 0.3)",
              },
              transition: "all 0.3s ease-in-out",
            }
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Link href="#" variant="body2" className="text-blue-500 hover:text-blue-700 transition-colors duration-200">
            Forgot password?
          </Link>
        </Box>

        <Button 
          onClick={handleSubmit} 
          fullWidth 
          type="submit" 
          variant="contained" 
          sx={{ mt: 2 }} 
          color="primary"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Login
        </Button>
        
        <Typography align="center" sx={{ mt: 2 }} className="text-gray-600">
          Don't have an account? <a className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors duration-200" onClick={handleSignup}>Sign up</a>
        </Typography>

        <Typography align="center" sx={{ mt: 2 }} className="text-gray-500">Or</Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          startIcon={<FaGoogle />}
          onClick={signInWithGoogle}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Continue with Google
        </Button>
      </Box>
    </Modal>
  );
};

export default Login;
