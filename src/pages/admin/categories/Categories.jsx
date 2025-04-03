import React, { useState } from 'react';
import ModalCategory from './ModalCategory';
import TableCategory from './TableCategory';
import MainHeader from '../../../components/admin/MainHeader';

const inner = {name : "", description : ""}
function Categories(props) {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState(inner);
    const [errors, setErrors] = useState({});
    const [find, setFind] = useState("");
    const [page, setPage] = useState(0);

  
    const handleOpen = () => {
        setOpen(true); 
        setCategory(inner);
        setErrors(inner)
    } ;

    const handleEdit = (row) => {
        setOpen(true);
        setCategory(row);
        setErrors(inner)
    };

    const handleClose = () => setOpen(false);
    
    const handleSearch = (e) => {
        setFind(e.target.value);
        setPage(0);
    };

    return (
        <div>
            <MainHeader 
                handleOpen={handleOpen} 
                handleSearch={handleSearch} 
                title="List Categories" 
            />
            <ModalCategory 
                errors={errors}
                setErrors={setErrors}
                open={open}
                handleClose={handleClose}
                category={category}
                setCategory={setCategory}
            />
            <TableCategory 
                handleEdit={handleEdit}
                handleOpen={handleOpen}
                category={category}
                setCategory={setCategory}
                find={find}
                setFind={setFind}
                page={page}
                setPage={setPage}
            />
        </div>
    );
}

export default Categories;