import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useContext, useState } from 'react';
import { PlansContext } from '../../../../context/PlansProvider';
import TablePagination from '@mui/material/TablePagination';
import { useNotification } from '../../../../context/NotificationProvide';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import ModalDelete from '../../../../components/admin/ModalDelete';
import { deleteDocument } from '../../../../services/firebaseService';
import ModalChooseCategories from '../../media_management/movie/ModalChooseCategories';


function TablePlan({ find, page, setPage, handleEdit }) {
    const plans = useContext(PlansContext)
    const [open, setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [deleteId, setDeleteId] = useState(null);
    const showNotification = useNotification();

    const searchPlan = plans?.filter((item) =>
        item.title?.toLowerCase().includes(find?.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onOpen = (id) => {
        setOpen(true);
        setDeleteId(id);
    };

    const onClose = () => {
        setOpen(false);
        setDeleteId(null);
    };

    const handleDelete = async () => {
        if(deleteId) {
            try {
                await deleteDocument("plans", deleteId);
                showNotification("Plan deleted successfully", "warning")
                onClose();
            } catch (error) {
                console.error("Lỗi khi xóa:", error);
            }
        }
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">id</TableCell>
                            <TableCell align="left">Level</TableCell>
                            <TableCell align="left">Price Per month</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchPlan.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{rowsPerPage * page + 1 + index}</TableCell>
                                <TableCell align="left">{row.level}</TableCell>
                                <TableCell align="left">{row.PricePerMonth}</TableCell>
                                <TableCell align="left">{row.title}</TableCell>
                                <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
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
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={searchPlan.length || 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <ModalDelete
                open={open}
                onClose={onClose}
               handleDelete={handleDelete}
            />        
        </div>
    );
}

export default TablePlan;