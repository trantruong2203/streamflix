import React, { useState, useEffect, useContext } from "react";
import { Search, Person, Menu, Close } from "@mui/icons-material";
import logo from "../../assets/DeWatermark.ai_1742354548201-removebg-preview.png";
import { Link } from "react-router-dom";
import { ContextAuth } from "../../context/AuthProvider";


const menuItems = [
    { path: "/main/categories", label: "Thể Loại" },
    { path: "/main/newmovie", label: "Phim Mới" },
    { path: "/main/movies", label: "Phim Lẻ" },
    { path: "/main/rentmovie", label: "Phim Thuê" },
    { path: "/main/actors", label: "Hỗ Trợ" },
    { path: "/main/schedule", label: "Lịch Chiếu" }
];

const SearchBar = () => (
    <div className="flex items-center backdrop-opacity-20 bg-white/30 rounded-lg px-3 py-2">
        <Search className="text-white" />
        <input
            type="text"
            placeholder="Tìm kiếm phim, diễn viên"
            className="text-white outline-none ml-2 w-80"
        />
    </div>
);

const MenuList = ({ className = "" }) => (
    <ul className={`flex ${className} text-white gap-5 font-sans`}>
        {menuItems.map((item) => (
            <li key={item.path}>
                <Link to={item.path} className="hover:text-blue-400 cursor-pointer transition-all duration-300">
                    {item.label}
                </Link>
            </li>
        ))}
    </ul>
);

function Header({ handleLogin }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
     const { accountLogin } = useContext(ContextAuth);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <>
            <header style={{ background: "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))" }} 
                    className="fixed top-0 right-0 left-0 z-10 py-1 px-4 md:px-6 flex justify-between items-center transition-all duration-300">
                <div className="flex items-center gap-2 md:gap-5">
                    <Link to="/main">
                        <img src={logo} alt="Logo" className="h-12 md:h-20 cursor-pointer" />
                    </Link>
                    <div className="hidden md:block">
                        <SearchBar />
                    </div>
                    <div className="hidden md:block">
                        <MenuList />
                    </div>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
                        {isMobileMenuOpen ? <Close /> : <Menu />}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-black/95 p-4 md:hidden">
                        <SearchBar />
                        <MenuList className="flex-col gap-4" />
                    </div>
                )}

                <div className="hidden md:flex items-center">
                    {accountLogin ?  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center cursor-pointer">
                        <Person className="text-black" />
                    </div>  : <button onClick={handleLogin} className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold mr-4 cursor-pointer">
                        Đăng Nhập
                    </button> }
                    
                   
                </div>
            </header>
           
        </>
    );
}

export default Header;