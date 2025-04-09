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
      >
        <Typography variant="h5" align="center" gutterBottom>
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
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
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Box>

        <Button onClick={handleSubmit} fullWidth type="submit" variant="contained" sx={{ mt: 2 }} color="primary">
          Login
        </Button>
        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account? <a className="text-blue-600" onClick={handleSignup}>Sign up</a>
        </Typography>

        <Typography align="center" sx={{ mt: 2 }}>Or</Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, bgcolor: "red", color: "white" }}
          startIcon={<FaGoogle />}
        >
          Continue with Google
        </Button>
      </Box>
    </Modal>
  );
};

export default Login;
