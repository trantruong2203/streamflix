import React, { useContext, useState } from 'react';
import { AccountsContext } from '../../../context/AccountsProvider';
import ModalDelete from '../../../components/admin/ModalDelete';
import { 
    TableContainer, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody, 
    Paper, 
    Avatar, 
    FormControl, 
    Input, 
    InputAdornment, 
    IconButton,
    Typography,
    Box,
    Chip
} from '@mui/material';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNotification } from '../../../context/NotificationProvide';
import { deleteDocument } from '../../../services/firebaseService';

function TableUsePage({ open, setOpen }) {
    const users = useContext(AccountsContext)
    const [deleteItem, setDeleteItem] = useState(null);
    const showNotification = useNotification();

    const onOpenDelete = (user) => {
        setDeleteItem(user);
        setOpen(true);
    }

    const onCloseDelete = () => {
        setDeleteItem(null);
        setOpen(false);
    }

    const handleDelete = async () => {
        await deleteDocument("accounts", deleteItem);
        showNotification("User deleted successfully", "warning")
        onCloseDelete();
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                User Management
            </Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Avatar</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>User Name</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Role</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Password</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row, index) => (
                            <TableRow
                                key={row.index}
                                sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { backgroundColor: '#f8f9fa' }
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">
                                    <Avatar 
                                        src={row.imgUrl} 
                                        sx={{ width: 40, height: 40 }}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {row.useName}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">
                                    <Chip 
                                        label={row.role} 
                                        color={row.role === 'admin' ? 'primary' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    {row.password ? (
                                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                            <Input
                                                type={'password'}
                                                value={row.password}
                                                sx={{ fontSize: '0.875rem' }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label={'hide the password'}
                                                            size="small"
                                                        >
                                                            {<VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    ) : (
                                        <Chip 
                                            label="Google Sign-in" 
                                            size="small"
                                            variant="outlined"
                                        />
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button 
                                            type="primary"
                                            onClick={() => handleEdit(row)} 
                                            icon={<EditOutlined />}
                                            size="small"
                                        />
                                        <Button 
                                            danger
                                            onClick={() => onOpenDelete(row)} 
                                            icon={<DeleteOutlined />}
                                            size="small"
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ModalDelete open={open} onClose={onCloseDelete} handleDelete={handleDelete} />
        </Box>
    );
}

export default TableUsePage;