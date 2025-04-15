import React, { useState } from 'react';
import MainHeader from "../../../../components/admin/MainHeader"
import TableActor from './TableActor';
import ModalActor from './ModalActor';
import ModalAddMultipleActors from './ModalAddMultipleActors';
import logo from "../../../../assets/DeWatermark.ai_1742354548201-removebg-preview.png"
const inner = {name: "", description: "", imgUrl : logo};

function Actors(props) {
    const [open, setOpen] = useState(false);
    const [openMultiple, setOpenMultiple] = useState(false);
    const [actor, setActor] = useState(inner);
    const [errors, setErrors] = useState({});
    const [find, setFind] = useState("");
    const [page, setPage] =  useState(0);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
        setActor(inner);
        setErrors(inner);
    };

    const handleOpenMultiple = () => {
        setOpenMultiple(true);
    };

    const handleCloseMultiple = () => {
        setOpenMultiple(false);
    };

    const handleEdit = (actor) => {
        setOpen(true);
        setActor(actor);
        setErrors(inner);
    };

    const handleSearch = (e) => {
        setFind(e.target.value);
        setPage(0);
    };

    return (
        <div>
            <MainHeader 
                title="List Actors" 
                handleOpen={handleOpen} 
                handleSearch={handleSearch}
                handleOpenMultiple={handleOpenMultiple}
            />
            <TableActor page={page} setPage={setPage} find={find} setFind={setFind} handleEdit={handleEdit} actor={actor} /> 
            <ModalActor open={open} setOpen={setOpen} actor={actor} setActor={setActor} errors={errors} setErrors={setErrors} handleOpen={handleOpen} handleClose={handleClose} />
            <ModalAddMultipleActors open={openMultiple} handleClose={handleCloseMultiple} />
        </div>
    );
}

export default Actors;