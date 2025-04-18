import React from 'react';
import AccountsMenu from './components/AccountsMenu';
import AccountInfor from './components/AccountInfor';
import RentMovieLibrary from './components/RentMovieLibrary';
import PlanManage from './components/PlanManage';
function AccountPage(props) {
    return (
        <div className='flex'>
            <AccountsMenu className='flex-1' />
            {/* <AccountInfor  /> */}
            {/* <RentMovieLibrary /> */}
            <PlanManage />
        </div>
    );
}

export default AccountPage;