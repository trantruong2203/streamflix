import React, { useState } from 'react';
import MainHeader from '../../../../components/admin/MainHeader';
import TableAuthor from '../authors/TableAuthor'
import ModalAuthor from '../authors/ModalAuthor'
import logo from "../../../../assets/DeWatermark.ai_1742354548201-removebg-preview.png"

const inner = {name: "", description: "", imgUrl : logo};
function Authors() {
const [open, setOpen] = useState(false);
const [author, setAuthor] = useState(inner);
const [ error, setError] = useState({});
const [find, setFind] = useState("")
const [page, setPage] = React.useState(0);



const handleopen = () => {
    setOpen(true);
    setAuthor(inner);
    setError(inner);
};

const handleClose = () => setOpen(false);

const handleSearch = (e) => {
    setFind(e.target.value);
}

const handleEdit = (author) => {
    setOpen(true);
    setAuthor(author);
    setError(inner);
};




    return (
        <div>
            <MainHeader title="List Authors" handleOpen={handleopen} handleSearch={handleSearch} />
            <TableAuthor find={find} setPage={setPage} page={page} handleEdit={handleEdit}/>
            <ModalAuthor handleClose={handleClose} open={open} author={author} setAuthor={setAuthor} error={error} setError={setError} handleEdit={handleEdit} />
            
            
        </div>
    );
}

export default Authors;