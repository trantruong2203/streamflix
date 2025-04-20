import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { updateDocument } from '../../services/firebaseService'; // Giả sử rằng updateDocument được import từ service này
import { useNotification } from '../../context/NotificationProvide';

function ResetPassword({ user, handleLogin, setForgot }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const showNotification = useNotification();

    // Kiểm tra nếu không có userId thì chuyển về trang quên mật khẩu
    if (!user) {
        navigate('/forgot-password');
        return null;
    }

    const validation = () => {
        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp");
            showNotification("Mật khẩu không khớp", "error");
            return false;
        }
       if (password.length < 6) {
        setError("Mật khẩu phải có ít nhất 6 ký tự");
        showNotification("Mật khẩu phải có ít nhất 6 ký tự", "error");
        return false;
       }
       return true;
    };

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordInput = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            showNotification("Mật khẩu không khớp", "error");
            return;
        }

        setLoading(true);
        //xử lý đặt lại mật khẩu
        try {
            // Gọi API để đặt lại mật khẩu
            await updateDocument(
                "accounts",
                {
                    id: user.id,
                    password: password
                }
            );
            showNotification("Đặt lại mật khẩu thành công", "success");
            setForgot(false);
            navigate('/main'); // Chuyển về trang đăng nhập sau khi thành công
        } catch (error) {
            showNotification("Đặt lại mật khẩu thất bại", "error");
            setError("Đặt lại mật khẩu thất bại");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="relative mx-auto mt-20 w-96 bg-white rounded-xl shadow-2xl p-8">
            <h1 className="text-3xl font-bold text-center text-amber-400 mb-6">Đặt lại mật khẩu</h1>
            <p className="text-gray-600 mb-4">Nhập mật khẩu mới</p>

            <input
                type="password"
                value={password}
                onChange={handlePasswordInput}
                placeholder="Mật khẩu mới"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 mb-4"
            />

            <p className="text-gray-600 mb-4">Nhập lại mật khẩu mới</p>
            <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordInput}
                placeholder="Xác nhận mật khẩu mới"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 mb-4"
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
            </button>

            <div 
                onClick={handleLogin} 
                className="block mt-6 text-center text-gray-600 hover:text-amber-400 transition duration-200"
            >
                Trở lại trang đăng nhập
            </div>
        </div>
    );
}

export default ResetPassword;