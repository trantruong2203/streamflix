import React from 'react';
import Main from './Main';
import Menu from '../../../components/admin/Menu';
import ChatBoxAdmin from '../../../components/admin/chat/ChatBoxAdmin';



function AdminDashboard() {
    return (
        <div className='md:flex'>
              <Menu />
              <Main  />
              <ChatBoxAdmin className="fixed right-5 bottom-5" />
        </div>
    );
}

export default AdminDashboard;