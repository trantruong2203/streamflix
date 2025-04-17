import React, { useContext, useState } from 'react';
import { AccountsContext } from '../../context/AccountsProvider';
import emailjs from 'emailjs-com';
import { CONFIRM_CODE, YOUR_SERVICE_ID, YOUR_USER_ID } from '../../utils/Contants';
import { Box } from '@mui/material';
import ResetPassword from './ResetPassword';

function FogotPassword({ handleLogin }) {
    const accounts = useContext(AccountsContext);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmCode, setConfirmCode] = useState("");
    const [userInputCode, setUserInputCode] = useState("");
    const [user, setUser] = useState(null);
    const [resetPassword, setResetPassword] = useState(false);

    const handleInput = (e) => {
        setEmail(e.target.value);
    };

    // Tạo mã xác nhận ngẫu nhiên gồm 4 chữ số
    const generateConfirmCode = () => {
        return Math.floor(1000 + Math.random() * 9000).toString();  // Mã xác nhận 4 số
    };

    // Thực hiện gửi mã xác nhận qua email
    const handleSubmit = async () => {
        if (!email) {
            alert("Vui lòng nhập email");
            return;
        }

        const foundUser = accounts.find((user) => user.email === email);
        if (!foundUser) {
            alert("Email không tồn tại trong hệ thống");
            return;
        }

        setLoading(true);
        try {
            const code = generateConfirmCode(); // Tạo mã xác nhận ngẫu nhiên
            setConfirmCode(code);
            setUser(foundUser);

            const templateParams = {
                username: foundUser.useName,
                verification_code: code,  // Gửi mã xác nhận qua email
                to_email: email,  // Địa chỉ email nhận
            };

            await emailjs.send(YOUR_SERVICE_ID, CONFIRM_CODE, templateParams, YOUR_USER_ID);
            alert("Mã xác nhận đã được gửi đến email của bạn");
            setIsModalVisible(true);
        } catch (error) {
            alert("Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.");
            console.error("Lỗi gửi email:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleVerifyCode = () => {
        if (userInputCode === confirmCode) {
            alert("Mã xác nhận chính xác!");
            setIsModalVisible(false);
            // Chuyển hướng đến trang đặt lại mật khẩu với thông tin người dùng
            setResetPassword(true);
        } else {
            alert("Mã xác nhận không chính xác. Vui lòng thử lại!");
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false);
        setUserInputCode("");
    }

    return (
        <>
            {resetPassword ? (
                <ResetPassword user={user} />
            ) : (
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
            <h1 className="text-3xl font-bold text-center text-amber-400 mb-6">Quên Mật Khẩu</h1>
            <p className="text-gray-600 mb-4">Nhập email của bạn</p>

            <input
                type="email"
                value={email}
                onChange={handleInput}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 mb-4"
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Đang gửi...' : 'Gửi mã xác nhận'}
            </button>

            <div 
                onClick={handleLogin} 
                className="block mt-6 text-center text-gray-600 hover:text-amber-400 transition duration-200"
            >
                Trở lại trang đăng nhập
            </div>
            
            {/* Modal xác nhận mã */}
            {isModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-80 max-w-md">
                        <h3 className="text-xl font-semibold mb-4 text-amber-400">Nhập mã xác nhận</h3>
                        <p className="mb-4 text-gray-600">Mã xác nhận đã được gửi đến email của bạn. Vui lòng kiểm tra và nhập mã xác nhận:</p>

                        <input
                            type="text"
                            placeholder="Nhập mã xác nhận 4 số"
                            value={userInputCode}
                            onChange={(e) => setUserInputCode(e.target.value)}
                            maxLength={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 mb-4"
                        />

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                onClick={handleVerifyCode}
                                className="px-4 py-2 bg-amber-400 text-white rounded-lg hover:bg-amber-500 transition"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </Box>
            )}
        </>
    );
}

export default FogotPassword;