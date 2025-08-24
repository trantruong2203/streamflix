import { Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Avatar, TablePagination, Popper, ClickAwayListener, Tooltip, IconButton, CircularProgress } from '@mui/material';
import React, { useContext, useState  } from 'react';
import { MoviesContext } from '../../../../context/MoviesProvider';
import { AuthorsContext } from '../../../../context/AuthorsProvider';
import { ContextCategories } from '../../../../context/CategoriesProvider';
import { MdCategory, MdDeleteForever, MdEdit, MdMovie, MdAccessTime, MdPerson } from 'react-icons/md';
import { getOjectById } from '../../../../services/FunctionRepon';
import ModalDelete from '../../../../components/admin/ModalDelete'
import { useNotification } from '../../../../context/NotificationProvide';
import { deleteDocument } from '../../../../services/firebaseService';
import { FaUsers, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { converDescription } from '../../../../services/FunctionRepon';
import { ActorContext } from '../../../../context/ActorProvide';
import { CharacterContext } from '../../../../context/CharactersProvider';
import { PlansContext } from '../../../../context/PlansProvider';
function TableMovie({ handleEdit, page, find, setPage }) {
    const movies = useContext(MoviesContext);
    const authors = useContext(AuthorsContext);
    const categories = useContext(ContextCategories);
    const actors = useContext(ActorContext)
    const character = useContext(CharacterContext)
    const plans = useContext(PlansContext);
    
    // State declarations
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [deleteId, setDeleteId] = useState(null);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);

    //Hiển thị thông báo thà
    const showNotification = useNotification();



    const onOpen = (id) => {
        setOpen(true);
        setDeleteId(id);
    };
    const onClose = () => {
        setOpen(false);
        setDeleteId(null);
    };

    const handleDelete = async () => {
        if (deleteId) {
            try {
                await deleteDocument("movies", deleteId);
                showNotification("Category delete success !!!", "warning");
                onClose();
            } catch (error) {
                console.error("Lỗi khi xóa:", error);
            }
        }
    };

    const searchMovie = movies.filter((movie) =>
        movie.name?.toLowerCase().includes(find.toLowerCase())
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

    const handleShowCategories = (event, listCate) => {
        setAnchorEl(event.currentTarget);
        setSelectedCategories(listCate);
    };

    const handleCloseCategories = () => {
        setAnchorEl(null);
        setSelectedCategories([]);
    };

    const openCategories = Boolean(anchorEl);
    const id = openCategories ? 'categories-popper' : undefined;

    // Styles for buttons and icons
    const buttonStyles = {
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }
    };

    return (
        <div >
            <TableContainer component={Paper} className="shadow-lg">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className="bg-gray-100">
                            <TableCell>ID</TableCell>
                            <TableCell >
                                <div className="flex items-center gap-2">
                                  <MdMovie className="text-li" /> Name
                                </div>
                            </TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>                               
                                Plan
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                <MdPerson className="text-primary" /> Author
                                </div>
                            </TableCell>
                            <TableCell>Categories</TableCell>
                            <TableCell>Entities</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchMovie.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={row.id} className="hover:bg-gray-50 transition-colors">
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">{row.name}</TableCell>
                                <TableCell>
                                    <Avatar 
                                        src={row.imgUrl} 
                                        width={80} 
                                        height={80}
                                        className="transition-transform hover:scale-110 cursor-pointer"
                                    />
                                </TableCell>
                                <TableCell>
                                    {converDescription(row.description)}
                                </TableCell>
                                <TableCell>{getOjectById(plans, row.planID)?.title}</TableCell>
                                <TableCell>{getOjectById(authors, row.authorID)?.name || "Unknown Author"}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={(e) => handleShowCategories(e, row.listCate)}
                                        aria-describedby={id}
                                        sx={buttonStyles}
                                        className="group"
                                    >
                                        <MdCategory className="transition-transform group-hover:rotate-12" />
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title={
                                        <div className='flex gap-1'>
                                            {row.listActor.map((actorId) => (
                                                <div key={actorId} className="transition-transform hover:scale-110">
                                                    <img 
                                                        className='w-10 h-10 rounded-full object-cover' 
                                                        src={getOjectById(actors, actorId)?.imgUrl} 
                                                        alt={`Actor ${actorId}`}
                                                    />                                                   
                                                </div>
                                            ))}
                                            {row.listCharacter.map((characterId) => (
                                                <div key={characterId} className="transition-transform hover:scale-110">
                                                    <img 
                                                        className='w-10 h-10 rounded-full object-cover' 
                                                        src={getOjectById(character, characterId)?.imgUrl} 
                                                        alt={`Character ${characterId}`}
                                                    />       
                                                </div>
                                            ))}
                                        </div>
                                    }>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={buttonStyles}
                                            className="group"
                                        >
                                            <FaUsers className="transition-transform group-hover:scale-110" />
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <div className='flex gap-2'>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={() => handleEdit(row)}
                                            sx={buttonStyles}
                                            className="group"
                                        >
                                            <FaRegEdit className="transition-transform group-hover:rotate-12" />
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            onClick={() => onOpen(row.id)} 
                                            color="secondary"
                                            sx={buttonStyles}
                                            className="group"
                                        >
                                            <FaTrashAlt className="transition-transform group-hover:rotate-12" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={searchMovie.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="mt-4"
            />

            <ModalDelete open={open} onClose={onClose} handleDelete={handleDelete} />

            <Popper
                id={id}
                open={openCategories}
                anchorEl={anchorEl}
                placement="bottom-start"
            >
                <ClickAwayListener onClickAway={handleCloseCategories}>
                    <Paper sx={{ p: 2, maxWidth: 300 }} className="shadow-xl">
                        <div className='flex flex-wrap gap-2'>
                            {selectedCategories?.map((categoryId) => (
                                <Button
                                    key={categoryId}
                                    variant="outlined"
                                    size="small"
                                    className="transition-all hover:bg-primary hover:text-white group"
                                >
                                    <MdCategory className="mr-1 transition-transform group-hover:rotate-12" />
                                    {getOjectById(categories, categoryId)?.name}
                                </Button>
                            ))}
                        </div>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </div>
    );
}

export default TableMovie;