import React, { useContext, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, IconButton, TablePagination } from '@mui/material';
import { EditOutlined, DeleteOutlined } from '@mui/icons-material';
import { getOjectById } from '../../../../services/FunctionRepon';
import { PlansContext } from '../../../../context/PlansProvider';
import { useNotification } from '../../../../context/NotificationProvide';
import { deleteDocument } from '../../../../services/firebaseService';
import { PackageContext } from '../../../../context/PackageProvider';
import ModalDelete from '../../../../components/admin/ModalDelete';

function TablePackage({handleEdit, page, setPage}) {
    const plans = useContext(PlansContext)
    const packages = useContext(PackageContext)
    const [open, setOpen] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const onOpenDelete = (item) => {
        setDeleteItem(item);
        setOpen(true);
    };

    const onCloseDelete = () => {
        setDeleteItem(null);
        setOpen(false);
    };

     // Xử lý thay đổi trang
     const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Xử lý thay đổi số hàng hiển thị trên mỗi trang
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleDelete = async () => {
        if(deleteItem) {
            try {
                await deleteDocument("packages", deleteItem);
                showNotification("Package deleted successfully", "warning")
                onCloseDelete();
            } catch (error) {
                console.error("Lỗi khi xóa:", error);
            }
        }
    }

    const showNotification = useNotification();
    return (
        <div>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Plan</TableCell>
                            <TableCell align="left">Discount</TableCell>
                            <TableCell align="left">Time</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow
                                key={row.index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">{getOjectById(plans, row.planId).title}</TableCell>
                                <TableCell align="left">{row.discount}</TableCell>
                                <TableCell align="left">{row.time}</TableCell>
                                <TableCell align="left" style={{ display: 'flex', gap: '10px' }}>
                                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                                        <EditOutlined />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => onOpenDelete(row)}>
                                        <DeleteOutlined />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

             {/* Pagination */}
             <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={packages.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <ModalDelete open={open} onClose={onCloseDelete} handleDelete={handleDelete} />
        </div>
    );
}

export default TablePackage;