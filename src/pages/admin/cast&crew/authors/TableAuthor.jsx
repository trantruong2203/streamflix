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
    const [deleteId, setDeleteId] = useState(null);
    const [open, setOpen] = useState(false);
    const searchAuthor = authors.filter((author) =>
        author.name.toLowerCase().includes(find.toLowerCase())
    );

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const showNotification = useNotification();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                await deleteDocument("author", deleteId);
                showNotification("Author delete success !!!", "success");
                onClose();
            } catch (error) {
                console.error("Lỗi khi xóa:", error);
            }
        }
    };

    const convertName = (description) => {
        return description.length > 50 ? description.substring(0, 50) + "..." : description;
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
                        {searchAuthor.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
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
                                    <Button sx={{ marginLeft: "10px" }} onClick={ () => handleEdit(row)}  variant="contained" color="primary">
                                        <FaEdit />
                                    </Button>
                                    <Button 
                                        onClick={() => onOpen(row.id)} 
                                        variant="contained" 
                                        color="error"  // Đổi màu thành error cho nút delete
                                        sx={{ ml: 1 }}  // Thêm margin left
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