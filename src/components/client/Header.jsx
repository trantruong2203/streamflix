import React from "react";
import { AppBar, Toolbar, Typography, InputBase, IconButton, Box, Avatar, Button, Icon } from "@mui/material";
import { Search, Person, Height } from "@mui/icons-material";

function Header(props) {
    return (
        <header className="bg-black py-1 px-6 flex justify-between items-center">
            <div className="flex items-center gap-5">
                <img src="/logo.webp" alt="Logo" className="h-20 cursor-pointer" />
                <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
                    <Search className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm phim, diễn viên"
                        className="bg-transparent text-white outline-none ml-2 w-80"
                    />
                </div>
                <ul className="flex text-white gap-5 font-sans  ">
                    <li className="hover:text-amber-300">Chủ Đề</li>
                    <li className="hover:text-amber-300">Duyệt Phim</li>
                    <li className="hover:text-amber-300">Phim Lẻ</li>
                    <li className="hover:text-amber-300">Quốc Gia</li>
                    <li className="hover:text-amber-300">Diễn Viên</li>
                    <li className="hover:text-amber-300">Lịch Chiếu</li>
                </ul>
            </div>
            <div className="flex items-center">
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold mr-4">
                    Tải Ứng Dụng
                </button>
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center cursor-pointer">
                    <Person className="text-black" />
                </div>
            </div>
        </header>
    );
}

export default Header;