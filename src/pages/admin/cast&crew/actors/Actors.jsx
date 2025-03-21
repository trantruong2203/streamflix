import React from 'react';
import MainHeader from "../../../../components/admin/MainHeader"
import TableActor from './TableActor';
import ModalActor from './ModalActor';
import logo from "../../../../assets/DeWatermark.ai_1742354548201-removebg-preview.png"
const inner = {name: "", description: "", imgUrl : logo};
function Actors(props) {
    const [open, setOpen] = React.useState(false);
    const [actor, setActor] = React.useState(inner);
    const [errors, setErrors] = React.useState({});
    const [find, setFind] = React.useState("");
    const [page, setPage] = React.useState(0);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
        setActor(inner);
        setErrors(inner);
        
    } ;

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
            <MainHeader title="List Actors" handleOpen={handleOpen} handleSearch={handleSearch} />
            <TableActor page={page} setPage={setPage} find={find} setFind={setFind} handleEdit={handleEdit} actor={actor} /> 
            <ModalActor open={open} setOpen={setOpen} actor={actor} setActor={setActor} errors={errors} setErrors={setErrors} handleOpen={handleOpen} handleClose={handleClose} />
        </div>
    );
}

export default Actors;