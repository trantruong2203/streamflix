import React, { useState, useEffect, useContext } from "react";
import { Search, Person, Menu, Close } from "@mui/icons-material";
import logo from "../../assets/DeWatermark.ai_1742354548201-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import { ContextAuth } from "../../context/AuthProvider";
import ModalUser from "./ModalUser";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { MoviesContext } from "../../context/MoviesProvider";

const menuItems = [
    { path: "/main/categories", label: "Thể Loại" },
    { path: "/main/newmovie", label: "Phim Mới" },
    { path: "/main/movies", label: "Phim Lẻ" },
    { path: "/main/rentmovie", label: "Phim Thuê" },
    { path: "/main/actors", label: "Hỗ Trợ" },
    { path: "/main/vip", label: "Gói Stream Flix" },

];

const SearchBar = ({ movies }) => {
    const navigate = useNavigate();
    
    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                id="movie-search"
                size="small"
                freeSolo
                options={movies}
                getOptionLabel={(option) => option.name || ''}
                renderOption={(props, option) => (
                    <li {...props} className="flex items-center gap-3 p-2 hover:bg-gray-700 bg-[#1a1a1a]">
                        <img 
                            src={option.imgUrl} 
                            alt={option.name}
                            className="w-12 h-16 object-cover rounded"
                        />
                        <div 
                            onClick={() => navigate(`/main/movies/detail/${option.id}`)} 
                            className="flex flex-col cursor-pointer"
                        >
                            <span className="text-white font-medium">{option.name}</span>
                            <span className="text-sm text-gray-400">{option.year}</span>
                        </div>
                    </li>
                )}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        placeholder="Tìm kiếm phim..."
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#1a1a1a',
                                borderRadius: '4px',
                                '& fieldset': {
                                    borderColor: 'transparent',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                },
                                '& input': {
                                    color: 'white',
                                    padding: '8px 12px',
                                    '&::placeholder': {
                                        color: 'rgba(255, 255, 255, 0.7)',
                                    },
                                },
                            },
                        }}
                    />
                )}
            />
        </Stack>
    );
};

const MenuList = ({ className = "flex items-center" }) => {
    return (
        <ul className={`${className} text-white gap-5 font-sans`}>
            {menuItems.map(({ path, label }) => (
                <li key={path}>
                    <Link 
                        to={path} 
                        className="hover:text-yellow-400 cursor-pointer transition-all duration-300"
                    >
                        {label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

function Header({ handleLogin }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { accountLogin } = useContext(ContextAuth);
    const movies = useContext(MoviesContext);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <>
            <header style={{
                background: isScrolled
                    ? "rgba(0, 0, 0, 0.9)"
                    : "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))"
            }}
                className="fixed top-0 right-0 left-0 z-10 py-1 px-4 md:px-6 flex justify-between items-center transition-all duration-300">
                <div className="flex items-center gap-2 md:gap-5">
                    <Link to="/main">
                        <img src={logo} alt="Logo" className="h-12 md:h-20 cursor-pointer" />
                    </Link>
                    <div className="hidden md:flex">
                        <SearchBar movies={movies} />
                    </div>
                    <div className="hidden md:flex">
                        <MenuList />
                    </div>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
                        {isMobileMenuOpen ? <Close /> : <Menu />}
                    </button>
                </div>

                <div className="hidden md:flex items-center">
                    {accountLogin ? <ModalUser /> : <button onClick={handleLogin} className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold mr-4 cursor-pointer">
                        Đăng Nhập
                    </button>}


                </div>

                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-black/95 p-4 md:hidden">
                        <SearchBar movies={movies} />
                        <MenuList className="flex-col gap-4" />
                    </div>
                )}


            </header>

        </>
    );
}

export default Header;