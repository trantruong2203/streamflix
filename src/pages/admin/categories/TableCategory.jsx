import React, { useContext, useEffect, useState } from 'react';
import { deleteDocument } from "../../../services/firebaseService";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination,Button} from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ContextCategories } from '../../../context/CategoriesProvider';
import ModalDelete from '../../../components/admin/ModalDelete';
import { useNotification } from '../../../context/NotificationProvide';

function TableCategory({ find, page, setPage, handleEdit }) {

    const categories = useContext(ContextCategories);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null); // Lưu ID danh mục cần xóa
    const showNotification = useNotification();
    
    const convertName = (description) => {
        return description.length > 50 ? description.substring(0, 50) + "..." : description;
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

    // Lọc danh mục theo tìm kiếm
    const searchCategory = categories.filter((item) =>
        item.name?.toLowerCase().includes(find.toLowerCase())
    );

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
                await deleteDocument("categories", deleteId);
                showNotification("Category delete success !!!", "warning");
                onClose();
            } catch (error) {
                console.error("Lỗi khi xóa:", error);
            }
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchCategory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{rowsPerPage * page + 1 + index}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{convertName(row.description)}</TableCell>
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

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={searchCategory.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* Dialog xác nhận xóa */}
            <ModalDelete open={open} onClose={onClose} handleDelete={handleDelete} />
        </>
    );
}

export default TableCategory;
