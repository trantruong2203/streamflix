import React, { useState } from 'react';
import MainHeader from '../../../components/admin/MainHeader';
import TableUsePage from './TableUsePage';
import ModalUserPage from './ModalUserPage';
const inner = {
    name: "",
    role: "",
    imgUrl: ""
}
function UserPages(props) {

   const [open, setOpen] = useState(false);
   const [user, setUser] = useState("");
   const [errors, setErrors] = useState({});

   
   const handleOpen = () => {
    setOpen(true);
   }

   const handleClose = () => {
    setOpen(false);
   }

   const handleEdit = (user) => {
    setOpen(true);
    setUser(user);
    setErrors(inner);
   }
    return (
        <div>
            <MainHeader title="User Pages"  />
            <TableUsePage open={open} setOpen={setOpen} user={user} setUser={setUser} errors={errors} setErrors={setErrors} handleEdit={handleEdit} />
            <ModalUserPage open={open} setOpen={setOpen} user={user} setUser={setUser} errors={errors} setErrors={setErrors} handleClose={handleClose} handleOpen={handleOpen} />
        </div>
    );
}

export default UserPages;