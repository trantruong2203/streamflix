import React, { useState, useContext } from 'react';
import MainHeader from '../../../../components/admin/MainHeader';
import ModalTrailer from './ModalTrailer';
import TableTrailer from './TableTrailer';

const inner = { trailerUrl: "", idMovie: "" }
function Trailer(props) {

    const [open, setOpen] = useState(false);
    const [trailer, setTrailer] = useState(inner);
    const [errors, setErrors] = useState({});
    const [find, setFind] = useState("");
    const [page, setPage] = useState(0);


    const handleOpen = () => {
        setOpen(true);
        setTrailer(inner);
        setErrors(inner)
    };

    const handleClose = () => setOpen(false);
    
    const handleSearch = (e) => {
        setFind(e.target.value);
        setPage(0);
    };

    const handleEdit = (row) => {
        setOpen(true);
        setTrailer(row);
        setErrors(inner);
    };


    return (
        <div>
            <MainHeader
                title="List Trailer"
                handleOpen={handleOpen}
                handleSearch={handleSearch} />
            <ModalTrailer
                errors={errors}
                setErrors={setErrors}
                open={open}
                handleClose={handleClose}
                trailer={trailer}
                setTrailer={setTrailer} />

            <TableTrailer
                find={find}
                page={page}
                setPage={setPage}
                handleEdit={handleEdit}
            />
        </div>
    );
}

export default Trailer;