import { Avatar, Button, Dialog, DialogTitle, MenuItem, styled, TextField } from '@mui/material';
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
const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

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

function ModalAddMovie({ open, handleClose, handleChoose, movie, typeChoose }) {
    const categories = useContext(ContextCategories);
    const actors = useContext(ActorContext);
    const characters = useContext(CharacterContext);
    return (
        <div>
            <Dialog onClose={handleClose} open={open} PaperProps={{
                sx: { width: "80vw", maxWidth: "80vw" }, // Giới hạn maxWidth để không quá lớn
            }} >
                <DialogTitle sx={{ fontSize: 40, fontFamily: 'fantasy' }}>ADD MOVIE</DialogTitle>
                <div className='grid grid-cols-2 gap-2 p-3'>
                    <div className='lg:col-span-1 col-span-2'>
                        <TextField margin="dense" fullWidth id="outlined-basic" label="Name" variant="outlined" />
                        <TextField margin="dense" fullWidth id="outlined-basic" label="Description" variant="outlined" />
                        <TextField margin="dense" fullWidth id="outlined-basic" label="Duration (in Minutes)" variant="outlined" />
                        <TextField margin="dense" fullWidth id="outlined-basic" label="Actor" variant="outlined" />
                        <TextField
                            fullWidth
                            margin="dense"
                            id="outlined-select-currency"
                            select
                            label="Plan Id"
                            defaultValue="EUR"
                            helperText="Please select your currency"
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField margin="dense" fullWidth id="outlined-basic" label="Rent" variant="outlined" />
                    </div>

                    <div className='lg:col-span-1 col-span-2 p-3'>
                        <div>
                            <h1
                                className='font-bold flex items-center gap-2 cursor-pointer hover:text-blue-600'
                                onClick={() => handleChoose("categories")}
                            >
                                Categories <MdCategory />
                            </h1>
                            <div className='mt-2 flex flex-wrap gap-2'>

                                <div className='mt-2 flex flex-wrap gap-2'>
                                    {movie.listCate.map((element, index) => (
                                        <div
                                            className='relative'>
                                            <DeleteIcon
                                                sx={{
                                                    position: 'absolute',
                                                    top: -1,
                                                    left: -1,
                                                    fontSize: '1rem',
                                                    cursor: 'pointer',
                                                    color: 'error.main',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                    padding: '2px'
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
                            <h1 onClick={() => handleChoose("actors")} className='font-bold flex items-center gap-2 cursor-pointer hover:text-blue-600'>Actors <FaUserTie /></h1>
                            <div className='flex gap-3 mt-2'>
                                {movie.listActor.map((element, index) => (
                                    <div className='relative'>
                                        <DeleteIcon
                                            sx={{
                                                position: 'absolute',
                                                top: -1,
                                                left: -4,
                                                fontSize: '1rem',
                                                cursor: 'pointer',
                                                color: 'error.main',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                padding: '2px'
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
                            <h1 onClick={() => handleChoose("characters")} className='font-bold flex items-center gap-2 cursor-pointer hover:text-blue-600'>Characters <MdSupervisedUserCircle /></h1>
                            <div className='flex gap-3 mt-2'>
                                {movie.listCharacter.map((element, index) => (
                                    <div className='relative'>
                                        <DeleteIcon
                                            sx={{
                                                position: 'absolute',
                                                top: -1,
                                                left: -4,
                                                fontSize: '1rem',
                                                cursor: 'pointer',
                                                color: 'error.main',
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                padding: '2px'
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
                            Upload Imgage
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => console.log(event.target.files)}
                                multiple
                            />
                        </Button>
                        <Avatar sx={{ width: "100px", height: "100px", margin: "auto", marginTop: "20px" }} src={logo} />
                    </div>

                </div>
            </Dialog>
        </div>
    );
}

export default ModalAddMovie;