import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    styled,
    TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext, useState } from 'react';
import { EpisodesContext } from '../../../../context/EpisodesProvider';
import { getOjectById } from '../../../../services/FunctionRepon';
import { MoviesContext } from '../../../../context/MoviesProvider';
import { useNotification } from '../../../../context/NotificationProvide';
import ModalDelete from '../../../../components/admin/ModalDelete';
import { deleteDocument } from '../../../../services/firebaseService';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transform: 'scale(1.1)',
        transition: 'all 0.2s ease-in-out'
    }
}));

function TableEpisodes({ find, page, setPage, handleEdit }) {
    const episodes = useContext(EpisodesContext);
    const movies = useContext(MoviesContext);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [deleteId, setDeleteId] = useState(null);
    const [open, setOpen] = useState(false);
    const showNotification = useNotification();


    const searchEpisodes = episodes.filter((item) =>
        item.name?.toLowerCase().includes(find.toLowerCase())
    );

    // Xử lý thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Xử lý thay đổi số hàng hiển thị trên mỗi trang
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Hàm mở modal xác nhận xóa
    const onOpen = (id) => {
        setDeleteId(id);
        setOpen(true);
    };

    // Hàm đóng modal
    const onClose = () => {
        setOpen(false);
        setDeleteId(null);
    };

    // 🛑 Xóa danh mục
    const handleDelete = async () => {
        if (deleteId) {
            try {
                await deleteDocument("episodes", deleteId);
                showNotification("Episodes delete success !!!", "warning");
                onClose();
            } catch (error) {
                console.error("Lỗi khi xóa:", error);
            }
        }
    };
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name Movie</TableCell>
                            <TableCell>Episodes Number</TableCell>
                            <TableCell>Episodes Url</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {episodes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{getOjectById(movies, row.idMovie)?.name}</TableCell>
                                <TableCell>{row.episodesNumber}</TableCell>
                                <TableCell>{row.episodesUrl}</TableCell>
                                <TableCell>
                                    <Tooltip title="Chỉnh sửa">
                                        <StyledIconButton onClick={() => handleEdit(row)} color="primary">
                                            <EditIcon />
                                        </StyledIconButton>
                                    </Tooltip>
                                    <Tooltip title="Xóa">
                                        <StyledIconButton onClick={() => onOpen(row.id)} color="error">
                                            <DeleteIcon />
                                        </StyledIconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={searchEpisodes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
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

export default TableEpisodes;