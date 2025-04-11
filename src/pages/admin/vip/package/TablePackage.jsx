import React, { useContext, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { EditOutlined, DeleteOutlined } from '@mui/icons-material';
import { getOjectById } from '../../../../services/FunctionRepon';
import { PlansContext } from '../../../../context/PlansProvider';
import { useNotification } from '../../../../context/NotificationProvide';
import { deleteDocument } from '../../../../services/firebaseService';
import { PackageContext } from '../../../../context/PackageProvider';
import ModalDelete from '../../../../components/admin/ModalDelete';
import { Button } from 'antd';

function TablePackage({handleEdit}) {
    const plans = useContext(PlansContext)
    const packages = useContext(PackageContext)
    const [open, setOpen] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);

    const onOpenDelete = (item) => {
        setDeleteItem(item);
        setOpen(true);
    }

    const onCloseDelete = () => {
        setDeleteItem(null);
        setOpen(false);
    }

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
                        {packages.map((row, index) => (
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
                                    <Button color="primary" onClick={() => handleEdit(row)} icon={<EditOutlined style={{ color: 'blue' }} />} />
                                    <Button color="warning" onClick={() => onOpenDelete(row)} icon={<DeleteOutlined style={{ color: 'red' }} />} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ModalDelete open={open} onClose={onCloseDelete} handleDelete={handleDelete} />
        </div>
    );
}

export default TablePackage;