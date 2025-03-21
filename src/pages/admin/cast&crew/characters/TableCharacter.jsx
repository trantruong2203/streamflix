import React, { useContext, useState } from 'react';
import { CharacterContext } from '../../../../context/CharactersProvider';
import ModalDelete from '../../../../components/admin/ModalDelete';
import { Avatar, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { useNotification } from '../../../../context/NotificationProvide';
import { deleteDocument } from '../../../../services/firebaseService';

function TableCharacter({ page, setPage, find, handleEdit }) {
    const characters = useContext(CharacterContext)
    const [deleteId, setDeleteId] = useState(null);
    const [open, setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const showNotification = useNotification();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const searchCharacter = characters.filter((item) =>
        item.name?.toLowerCase().includes(find.toLowerCase())
    );

    const onOpen = (id) => {
        setDeleteId(id);
        setOpen(true);
    };
    const onClose = () => {
        setDeleteId(null);
        setOpen(false);
    };

    const handleDelete = async () => {
        if (deleteId) {
            try {
                await deleteDocument("characters", deleteId);
                showNotification("Delete successfully", "success");
                onClose();
            } catch (error) {
                console.error("Error deleting document:", error);
            }
        }
    };

    const convertName = (name) => {
        if (name.length > 50) {
            return name.substring(0, 100) + "...";
        }
        return name;
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchCharacter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {rowsPerPage * page + 1 + index}
                                </TableCell>
                                <TableCell align='left'>
                                    <Avatar alt="Cindy Baker" src={row.imgUrl} />
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{convertName(row.description)}</TableCell>
                                <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
                                    {/* Các nút sửa và xóa ở đây */}
                                    <Button onClick={() => handleEdit(row)} variant="contained" color="primary">
                                        <FaEdit />
                                    </Button>
                                    <Button sx={{ marginLeft: "10px" }} onClick={() => onOpen(row.id)} variant="contained" color="secondary">
                                        <MdDeleteForever />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={searchCharacter.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <ModalDelete open={open} onClose={onClose} handleDelete={handleDelete} />
        </div>
    );
}

export default TableCharacter;