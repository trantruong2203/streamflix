import { Autocomplete, Avatar, Button, Dialog, DialogTitle, MenuItem, styled, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { MdCategory, MdSupervisedUserCircle } from "react-icons/md";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import logo from '../../../../assets/DeWatermark.ai_1742354548201-removebg-preview.png'
import DeleteIcon from '@mui/icons-material/Delete';
import { getOjectById } from '../../../../services/FunctionRepon';
import { ContextCategories } from '../../../../context/CategoriesProvider';
import { ActorContext } from '../../../../context/ActorProvide';
import { CharacterContext } from '../../../../context/CharactersProvider';
import { AuthorsContext } from '../../../../context/AuthorsProvider';
import { PlansContext } from '../../../../context/PlansProvider';
import { useNotification } from '../../../../context/NotificationProvide';
import { addDocument, updateDocument } from '../../../../services/firebaseService';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,

});

function ModalAddMovie({ open, handleClose, handleChoose, movie, handleSelect, setMovie, errors, setErrors }) {
    const categories = useContext(ContextCategories);
    const actors = useContext(ActorContext);
    const characters = useContext(CharacterContext);
    const authors = useContext(AuthorsContext);
    const plans = useContext(PlansContext);
    const showNotification = useNotification();

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'duration') {
            // Chỉ cho phép nhập số và không cho phép số âm
            const numberValue = value.replace(/[^0-9]/g, '');
            setMovie({ ...movie, [name]: numberValue });
        } else {
            setMovie({ ...movie, [name]: value });
        }
    };

    const validation = () => {
        const newErrors = {};
        if (!movie.name) {
            newErrors.name = "Name is required";
        }
        if (!movie.duration) {
            newErrors.duration = "Duration is required";
        }
        if (!movie.description) {
            newErrors.description = "Description is required";
        }
        if (!movie.authorID) {
            newErrors.authorID = "Author is required";
        }
        if (!movie.planID) {
            newErrors.planID = "Plan Id is required";
        }
        if (!movie.imgUrl) {
            newErrors.imgUrl = "Image is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validationCate = () => {
        const newErrors = {};
        if (movie.listCate.length === 0) {
            newErrors.listCate = "At least one category is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const result = new FileReader();
            result.readAsDataURL(file);
            result.onload = () => {
                setMovie({ ...movie, imgUrl: result.result });
            }
        }
    };
    
    const handleFileUploadBanner = (event) => {
        const file = event.target.files[0];
        if (file) {
            const result = new FileReader();
            result.readAsDataURL(file);
            result.onload = () => {
                setMovie({ ...movie, imgBanner: result.result });
            }
        }
    }

    const onSubmit = async () => {
        try {
            if (!validation()) return;
            if (movie.id) {
                await updateDocument("movies", movie);
                showNotification("Movie updated successfully", "success");
                handleClose();
            } else {
                await addDocument("movies", movie);
                showNotification("Movie added successfully", "success");
                handleClose();
            }
        } catch (error) {
            showNotification("Error adding movie: " + error.message, "error");
        }
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={open} PaperProps={{
                sx: { width: "80vw", maxWidth: "80vw" }, // Giới hạn maxWidth để không quá lớn
            }} >
                <DialogTitle sx={{ fontSize: 20, fontFamily: 'fantasy', padding: "12px", paddingBottom: "0" }}>{movie?.id ? "Edit Movie" : "Add Movie"}</DialogTitle>
                <div className='grid grid-cols-2 p-3 gap-2'>
                    <div className='col-span-2 lg:col-span-1'>
                        <TextField margin="dense" name='name' value={movie.name} fullWidth id="outlined-basic" label="Name" variant="outlined" onChange={handleInput} helperText={errors.name} error={!!errors.name} />
                        <TextField
                            margin="dense"
                            name='duration'
                            value={movie.duration}
                            fullWidth
                            id="outlined-basic"
                            label="Duration (in Minutes)"
                            variant="outlined"
                            onChange={handleInput}
                            helperText={errors.duration}
                            error={!!errors.duration}
                            type="number"
                            inputProps={{
                                min: 0,
                                step: 1
                            }}
                        />
                        <Autocomplete
                            className='mt-2'
                            options={authors} // Danh sách các tác giả
                            getOptionLabel={(option) => option.name} // Hiển thị tên của tác giả
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tìm kiếm hoặc chọn tác giả"
                                    error={!!errors.authorID}
                                    helperText={errors.authorID}
                                />
                            )}
                            value={
                                authors.find((author) => author.id === movie.authorID) || null // Hiển thị giá trị đã chọn
                            }
                            onChange={(event, newValue) => {
                                // Cập nhật giá trị khi người dùng chọn
                                handleInput({
                                    target: { name: "authorID", value: newValue ? newValue.id : "" },
                                });
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id} // So sánh giá trị
                            noOptionsText="Không tìm thấy kết quả" // Thông báo khi không có kết quả
                            fullWidth
                        />
                        <TextField name='description' value={movie.description} margin="dense" multiline rows={2} fullWidth id="outlined-basic" label="Description" variant="outlined" onChange={handleInput} />

                        <Autocomplete
                            className='mt-2'
                            options={plans.sort((a, b) => a.title.localeCompare(b.title))}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Plan Id"
                                    error={!!errors.plan}
                                    helperText={errors.plan}
                                />
                            )}
                            value={
                                plans.find((plan) => plan.id === movie.planID) || null // Hiển thị giá trị đã chọn
                            }
                            onChange={(event, newValue) => {
                                // Cập nhật giá trị khi người dùng chọn
                                handleInput({
                                    target: { name: "planID", value: newValue ? newValue.id : "" },
                                });
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id} // So sánh giá trị
                            noOptionsText="Không tìm thấy kết quả" // Thông báo khi không có kết quả
                            fullWidth
                        />
                        <TextField name='rentalPrice' value={movie.rentalPrice} margin="dense" fullWidth id="outlined-basic" label="Rent" variant="outlined" onChange={handleInput} />
                    </div>

                    <div className='col-span-2 p-3 lg:col-span-1'>
                        <div>
                            <h1
                                className='flex cursor-pointer font-bold gap-2 hover:text-blue-600 items-center'
                                onClick={() => handleChoose("categories")}
                            >
                                Categories <MdCategory />
                            </h1>
                            <div className='flex flex-wrap gap-2 mt-2'>

                                <div className='flex flex-wrap gap-2 mt-2'>
                                    {movie.listCate?.map((element, index) => (
                                        <div
                                            className='relative'>
                                            <DeleteIcon onClick={() => handleSelect(element, "categories")}
                                                sx={{
                                                    position: 'absolute',
                                                    top: -4,
                                                    left: -4,
                                                    fontSize: '1rem',
                                                    cursor: 'pointer',
                                                    color: 'error.main',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    padding: '2px',
                                                    zIndex: "10"
                                                }}
                                            />
                                            <Button variant="outlined">
                                                {getOjectById(categories, element)?.name}
                                            </Button>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        </div>

                        <div className='mt-3'>
                            <h1 onClick={() => handleChoose("actors")} className='flex cursor-pointer font-bold gap-2 hover:text-blue-600 items-center'>Actors <FaUserTie /></h1>
                            <div className='flex gap-3 mt-2'>
                                {movie.listActor?.map((element) => (
                                    <div className='relative'>
                                        <DeleteIcon onClick={() => handleSelect(element, "actors")}
                                            sx={{
                                                position: 'absolute',
                                                top: -1,
                                                left: -4,
                                                fontSize: '1rem',
                                                cursor: 'pointer',
                                                color: 'error.main',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                padding: '2px',
                                                zIndex: "10"
                                            }}
                                        />
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={getOjectById(actors, element)?.imgUrl}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                    </div>
                                ))}

                            </div>
                        </div>

                        <div className='mt-3'>
                            <h1 onClick={() => handleChoose("characters")} className='flex cursor-pointer font-bold gap-2 hover:text-blue-600 items-center'>Characters <MdSupervisedUserCircle /></h1>
                            <div className='flex gap-3 mt-2'>
                                {movie.listCharacter?.map((element, index) => (
                                    <div className='relative'>
                                        <DeleteIcon onClick={() => handleSelect(element, "characters")}
                                            sx={{
                                                position: 'absolute',
                                                top: -1,
                                                left: -4,
                                                fontSize: '1rem',
                                                cursor: 'pointer',
                                                color: 'error.main',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                padding: '2px',
                                                zIndex: "10"
                                            }}
                                        />
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={getOjectById(characters, element)?.imgUrl}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                    </div>
                                ))}

                            </div>
                        </div>

                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Upload Image
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleFileUpload}
                                accept="image/*"
                            />
                        </Button>
                        <Avatar sx={{ width: "100px", height: "100px", margin: "auto", marginTop: "20px" }} src={movie.imgUrl || logo} />

                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Upload Banner
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleFileUploadBanner}
                                accept="image/*"
                            />
                        </Button>
                        <Avatar sx={{ width: "100px", height: "100px", margin: "auto", marginTop: "20px" }} src={movie.imgBanner || logo} />
                    </div>

                </div>
                <div className='flex justify-end'>
                    <Button onClick={onSubmit} color="primary" variant="contained" sx={{ width: "30px", padding: "5px", margin: " 5px" }}>
                        {movie.id ? "Update" : "Add"}
                    </Button>
                </div>
            </Dialog>
        </div>
    );
}

export default ModalAddMovie;