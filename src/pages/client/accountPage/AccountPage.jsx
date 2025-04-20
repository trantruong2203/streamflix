import React from 'react';
import AccountsMenu from './components/AccountsMenu';
import { Outlet } from 'react-router-dom';
function AccountPage(props) {
    return (
        <div className='flex'>
            <AccountsMenu className='flex-1' />
            <Outlet />
        </div>
    );
}

export default AccountPage;