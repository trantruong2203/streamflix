import React, { useState } from 'react';
import { IoMenuSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { FaUsers, FaFileAlt, FaCaretDown } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa6";
import { listMenu } from '../../utils/Contants';
import logo from "../../assets/DeWatermark.ai_1742354548201-removebg-preview.png";
import { Link } from 'react-router-dom';
function Menu(props) {
    const [show, setShow] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const handleShow = (id) => {
        if (show == id) {
            setShow("");
        } else {
            setShow(id);
        }
    }
    return (
        <div className='bg-linear-65 from-purple-500 to-pink-500 p-4 text-gray-50 md:h-screen'>
            {showMenu && <img className='flex w-20 mb-3 justify-self-center' src={logo} alt="" />}
            <div onClick={() => setShowMenu(!showMenu)} className='flex items-center gap-2 bg-linear-to-r from-cyan-500 to-blue-500 hover:to-blue-300 transition-colors duration-300  rounded-sm p-2 mb-2'><IoMenuSharp className='text-lg' />{showMenu ? <h1>WatchTV <span className='text-black font-bold'>Admin</span></h1> : <img className='flex w-10  justify-self-center' src={logo} alt="" />}</div>
            <div className={showMenu ? "" : "max-md:hidden"}>
                <Link to={"/"} className='flex items-center gap-2 bg-linear-to-r from-cyan-500 to-blue-500 hover:to-blue-300 transition-colors duration-300  rounded-sm p-2 mb-2'><MdDashboard /> {showMenu && <p>Dashboard</p>} </Link>
                {showMenu && <p>UI ELEMENTS</p>}
                <Link to={"/categories"} className='flex items-center gap-2 bg-linear-to-r from-cyan-500 to-blue-500 hover:to-blue-300 transition-colors duration-300 rounded-sm p-2 mb-2'><BiCategoryAlt /> {showMenu && <p>Categories</p>} </Link>
                {showMenu && <div> FORM AND DATAS</div>}
                {listMenu.map((e) => (
                    <div key={e.id} className="relative">

                        <div
                            onClick={() => handleShow(e.id)}
                            className="flex gap-2 items-center bg-linear-to-r from-cyan-500 to-blue-500 hover:to-blue-300 transition-colors duration-300 rounded-sm p-2 mb-2 cursor-pointer"
                        >
                            {e.icon}
                            {showMenu && <p>{e.title}</p>}
                            <span className={`ml-auto transform transition-transform `}>
                                {show === e.id ? <FaCaretDown /> : <FaCaretRight />}
                            </span>
                        </div>

                        <ul className={
                            showMenu ? `flex flex-col transition-all duration-300 overflow-hidden 
        ${show === e.id ? "max-h-[200px] opacity-100 scale-100 visible" : "max-h-0 opacity-0 scale-95 invisible"}
      ` :
                                ` 
      absolute flex flex-col left-full  top-0 min-w-[150px]  rounded-sm transition-all duration-300 
      ${show === e.id ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}
    `
                        }>
                            {e.items.map((item, index) => (
                                <Link to={item.path} key={index} className="bg-gray-400 p-2 mb-2 rounded-sm ml-2 hover:bg-gray-500 transition">
                                    {item.title}
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))}

                {showMenu && <div>PAGES</div>}
                <Link to="/userspage" className='flex items-center gap-2 bg-linear-to-r from-cyan-500 to-blue-500 hover:to-blue-300 transition-colors duration-300 rounded-sm p-2 mb-2'><FaUsers /> {showMenu && <p>User Pages</p>} </Link>
                {showMenu && <div>HELP</div>}
                <Link to="/profile" className='flex items-center gap-2 bg-linear-to-r from-cyan-500 to-blue-500 hover:to-blue-300 transition-colors duration-300 rounded-sm p-2 mb-2'><FaFileAlt />{showMenu && <p>Profile</p>}</Link>
            </div>
        </div>
    );
}

export default Menu;