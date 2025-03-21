import React, { useState } from 'react';
import MainHeader from '../../../../components/admin/MainHeader';
import ModalCharacter from './ModalCharacter';
import TableCharacter from './TableCharacter'


const inner = {name: "", imgUrl: "", description: ""}
function Characters(props) {
    const [open, setOpen] = useState(false);
    const [character, setCharacter] = useState(inner);
    const [errors, setErrors] = useState({});
    const [find, setFind] = useState("");
    const [page, setPage] = useState(0);

    const handleOpen = () => {
        setOpen(true);
        setCharacter(inner);
        setErrors(inner)
    } ;

    const handleEdit = (row) => {
        setOpen(true);
        setCharacter(row);
        setErrors(inner)
    } ;

    const handleClose = () => setOpen(false);

    const handleSearch = (e) => {
        setFind(e.target.value);
        setPage(0);
    };
    return (
        <div>
           <MainHeader handleOpen={handleOpen} handleSearch={handleSearch} title="List Characters"  />
           <ModalCharacter errors={errors} setErrors={setErrors} open={open} handleClose={handleClose} character={character} setCharacter={setCharacter} />
           <TableCharacter page={page} setPage={setPage} find={find} handleEdit={handleEdit} />
        </div>
    );
}

export default Characters;