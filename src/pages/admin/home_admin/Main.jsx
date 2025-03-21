import React, { useState } from 'react';
import AdminRouters from '../../../routers/AdminRouters';
import Header from '../../../components/admin/Header';


function Main(props) {

  return (
    <div className='flex-1 '>
      <Header />
      <div className='p-3 md:p-5 xl:p-10'>
        <AdminRouters />
      </div>
    </div>
  );
}

export default Main;