import React from 'react';
import Main from './Main';
import Menu from '../../../components/admin/Menu';




function AdminDashboard(props) {
    return (
        <div className='md:flex'>
              <Menu />
              <Main  />
        </div>
    );
}

export default AdminDashboard;