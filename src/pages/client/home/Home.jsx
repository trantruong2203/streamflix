import React, { useState } from 'react';
import Header from '../../../components/client/Header';
import Footer from '../../../components/client/footer/Footer';
import ClienRouters from '../../../routers/ClienRouters';
import Signup from '../../../components/client/Signup';
import Login from '../../../components/client/Login';
import ChatBoxClient from '../../../components/admin/chat/ChatBoxClient';
function Home() {
     const [openLogin, setOpenLogin] = useState(false);
     const [openSignup, setOpenSignup] = useState(false);
     
    const handleSignup = () => {
        setOpenSignup(true);
        setOpenLogin(false);
    };

    const handleLogin = () => {
        setOpenLogin(true);
        setOpenSignup(false);
    };

    return (
        <div>
            <Header handleLogin={handleLogin} />
            <div className='bg-midnight'>
             <ClienRouters />
            </div>
            <Footer/>
            <Signup open={openSignup} handleClose={() => setOpenSignup(false)} handleLogin={handleLogin} />
            <Login open={openLogin} handleClose={() => setOpenLogin(false)} handleSignup={handleSignup} />  
            <ChatBoxClient />

        </div>
    );
}

export default Home;