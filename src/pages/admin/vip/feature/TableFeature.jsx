import React, { useContext, useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import { FeatureContext } from '../../../../context/FeatureProvider';

import { PlansContext } from '../../../../context/PlansProvider';
import { getOjectById } from '../../../../services/FunctionRepon';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import ModalDelete from '../../../../components/admin/ModalDelete';
import { useNotification } from '../../../../context/NotificationProvide';
import { deleteDocument } from '../../../../services/firebaseService';

function TableFeature({handleEdit, handleClose,}) {
    const  features  = useContext(FeatureContext);
    const  plans  = useContext(PlansContext);
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




    const showNotification = useNotification();

    const handleDelete = async () => {
        if(deleteItem) {
            try {
                await deleteDocument("features", deleteItem);
                showNotification("Feature deleted successfully", "warning")
                onCloseDelete();
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
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Plan</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Available</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {features.map((row, index) => (
                            <TableRow
                                key={row.index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">{getOjectById(plans, row.plan).title}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left">{row.available}</TableCell>
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

            <ModalDelete open={open} onClose={onCloseDelete} handleDelete={handleDelete} />
        </div>
    );
}

export default TableFeature;