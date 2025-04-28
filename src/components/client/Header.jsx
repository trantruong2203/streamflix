import React, { useState, useEffect, useContext } from "react";
import { Search, Person, Menu, Close } from "@mui/icons-material";
import logo from "../../assets/DeWatermark.ai_1742354548201-removebg-preview.png";
import { Link } from "react-router-dom";
import { ContextAuth } from "../../context/AuthProvider";
import ModalUser from "./ModalUser";
import { MoviesContext } from "../../context/MoviesProvider";
import { FaUser } from "react-icons/fa";
import SearchMovie from "./SearchMovie";
import { listMenuClient } from "../../utils/Contants";
import { IoIosSearch } from "react-icons/io";

function Header({ handleLogin }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { accountLogin } = useContext(ContextAuth);
    const movies = useContext(MoviesContext);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const MenuList = ({ className = "flex items-center" }) => {
        return (
            <ul className={`${className} text-white gap-5 font-sans`}>
                {listMenuClient.map(({ path, label, children }) => (
                    <li key={path} className="relative group">
                        <Link
                            to={path}
                            className="hover:text-yellow-400 cursor-pointer transition-all duration-300"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {label}
                        </Link>
                        {children && (
                            <div className="absolute left-0 top-full bg-gray-800 min-w-[200px] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                {children.map((child) => (
                                    <Link
                                        key={child.path}
                                        to={child.path}
                                        className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-yellow-400 transition-all duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {child.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            <header style={{
                background: isScrolled
                    ? "rgba(0, 0, 0, 0.9)"
                    : "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))"
            }}
                className="fixed top-0 right-0 left-0 z-50 py-1 px-4 lg:px-6 flex justify-between items-center transition-all duration-300">
                <div className="flex items-center gap-2 lg:gap-5">
                    <div className="lg:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
                            {isMobileMenuOpen ? <Close /> : <Menu />}
                        </button>
                    </div>

                    <Link to="/main">
                        <img src={logo} alt="Logo" className="h-10 lg:h-16 cursor-pointer" />
                    </Link>

                    <div className="hidden lg:block">
                        <SearchMovie movies={movies} />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="text-white p-2"
                        >
                            {isSearchOpen ? "": <IoIosSearch className="text-2xl" />}
                        </button>
                    </div>

                    <div className="hidden lg:flex items-center gap-3">
                        <MenuList />
                        <Link
                            to="/main/vip"
                            className={`text-white p-2 bg-yellow-500 rounded-full px-5 hover:bg-amber-300 cursor-pointer transition-all duration-100 ${accountLogin ? 'block' : 'hidden'}`}
                        >
                            Đăng ký gói
                        </Link>

                        {accountLogin ? (
                            <ModalUser />
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-5 py-2 rounded-md font-medium cursor-pointer hover:shadow-lg hover:from-amber-500 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105"
                            >
                                <FaUser className="text-sm" />
                                <span>Đăng Nhập / Đăng Ký</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-black/95 z-40 pt-20 px-4 lg:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-4 right-4 text-white p-2 hover:text-yellow-400 transition-colors duration-300"
                        >
                            <Close className="text-2xl" />
                        </button>
                        <div className="flex flex-col gap-6">
                            <MenuList className="flex-col gap-4" />

                            <div className="flex flex-col gap-4 mt-4">
                                <Link
                                    to="/main/vip"
                                    className={`text-white p-2 bg-yellow-500 rounded-full text-center hover:bg-amber-300 cursor-pointer transition-all duration-100 ${accountLogin ? 'block' : 'hidden'}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Đăng ký gói
                                </Link>

                                {!accountLogin && (
                                    <button
                                        onClick={() => {
                                            handleLogin();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-5 py-3 rounded-md font-medium cursor-pointer hover:shadow-lg hover:from-amber-500 hover:to-yellow-400 transition-all duration-300"
                                    >
                                        <FaUser className="text-sm" />
                                        <span>Đăng Nhập / Đăng Ký</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile Search */}
                {isSearchOpen && (
                    <div className=" lg:hidden">
                        <div className="relative">
                            <SearchMovie movies={movies} />
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="absolute right-0 top-0 text-white p-2"
                            >
                                <Close />
                            </button>

                        </div>
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;