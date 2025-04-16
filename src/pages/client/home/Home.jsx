import React, { useState } from 'react';
import Header from '../../../components/client/Header';
import Footer from '../../../components/client/footer/Footer';
import ClienRouters from '../../../routers/ClienRouters';
import Signup from '../../../components/client/Signup';
import Login from '../../../components/client/Login';
function Home(props) {
     const [openLogin, setOpenLogin] = useState(false);
     const [openSignup, setOpenSignup] = useState(false);
     
    const handleSignup = () => {
        console.log("fdbvdf");
        
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
            <div className='bg-black'>
             <ClienRouters />
            </div>
            <Footer/>
            <Signup open={openSignup} handleClose={() => setOpenSignup(false)} handleLogin={handleLogin} />
            <Login open={openLogin} handleClose={() => setOpenLogin(false)} handleSignup={handleSignup} />  
        </div>
    );
}

export default Home;