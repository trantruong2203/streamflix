import React, { useState } from 'react';
import MainHeader from '../../../components/admin/MainHeader';
import TableUsePage from './TableUsePage';

function UserPages(props) {

   const [open, setOpen] = useState(false);
   
   const handleOpen = () => {
    setOpen(true);
   }

   const handleClose = () => {
    setOpen(false);
   }
    return (
        <div>
            <MainHeader title="User Pages"  />
            <TableUsePage open={open} setOpen={setOpen}/>
        </div>
    );
}

export default UserPages;