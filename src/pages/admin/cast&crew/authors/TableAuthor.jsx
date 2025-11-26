import React, { useContext, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { AuthorsContext } from '../../../../context/AuthorsProvider';
import { Avatar, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import ModalDelete from '../../../../components/admin/ModalDelete';
import { useNotification } from '../../../../context/NotificationProvide';
import { deleteDocument } from '../../../../services/firebaseService';


function TableAuthor({ find, page, handleEdit, setPage }) {
    const authors = useContext(AuthorsContext);
    const [deleteId, setDeleteId] = useState({});
    const [open, setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const showNotification = useNotification();
    
    const searchAuthor = authors.filter((item) => 
        item.name?.toLowerCase().includes(find.toLowerCase())
    );

    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onOpen = (item) => {
        setDeleteId(item);
        setOpen(true);

    };

    const onClose = () => {
        setDeleteId(null);
        setOpen(false);
    };

    const handleDelete = async () => {
        if (deleteId) {
            try {
                await deleteDocument("author", deleteId);
                showNotification("Author delete success !!!", "success");
                onClose();
            } catch (error) {
                console.error("Lỗi khi xóa:", error);
                showNotification("Failed to delete author. Please try again.", "error");
            }
        }
    };

    



    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="authors table">
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
                        {searchAuthor.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {rowsPerPage * page + 1 + index}
                                </TableCell>
                                <TableCell align='left'>
                                    <Avatar alt={`${row.name}'s avatar`} src={row.imgUrl} />
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
                                    <Button 
                                        sx={{ marginLeft: "10px" }} 
                                        onClick={() => handleEdit(row)}  
                                        variant="contained" 
                                        color="primary"
                                        aria-label="Edit author"
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button 
                                        onClick={() => onOpen(row)} 
                                        variant="contained" 
                                        color="error"
                                        sx={{ ml: 1 }}
                                        aria-label="Delete author"
                                    >
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
                count={searchAuthor.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <ModalDelete 
                open={open}  // Truyền prop open thay vì onOpen
                onClose={onClose} 
                handleDelete={handleDelete} 
            />
        </div>
    );
}

export default TableAuthor;