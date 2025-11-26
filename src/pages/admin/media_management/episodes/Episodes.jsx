import React, { useState } from 'react';
import MainHeader from '../../../../components/admin/MainHeader';
import ModalEpisodes from './ModalEpisodes';
import TableEpisodes from './TableEpisodes';

const inner = { episodesNumber: "", episodesUrl: "", idMovie: "" }
function Episodes() {

    const [open, setOpen] = useState(false);
    const [episode, setEpisode] = useState(inner);
    const [errors, setErrors] = useState({});
    const [find, setFind] = useState("");
    const [page, setPage] = useState(0);

    const handleOpen = () => {
        setOpen(true);
        setEpisode(inner);
        setErrors(inner)
    };

    const handleClose = () => setOpen(false);
    
    const handleSearch = (e) => {
        setFind(e.target.value);
        setPage(0);
    };

    const handleEdit = (row) => {
        setOpen(true);
        setEpisode(row);
        setErrors(inner);
    };


    return (
        <div>
            <MainHeader
                title="List Episodes"
                handleOpen={handleOpen}
                handleSearch={handleSearch}
            />
            <ModalEpisodes
                errors={errors}
                setErrors={setErrors}
                open={open}
                handleClose={handleClose}
                episode={episode}
                setEpisode={setEpisode} />

            <TableEpisodes
                find={find}
                page={page}
                setPage={setPage}
                handleEdit={handleEdit}
            />

        </div>
    );
}

export default Episodes;