import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNotification } from '../../../../context/NotificationProvide';
import { MoviesContext } from '../../../../context/MoviesProvider';
import { addDocument, updateDocument } from '../../../../services/firebaseService';

function ModalTrailer({ open, handleClose, setTrailer, trailer, errors, setErrors }) {
    const movie = useContext(MoviesContext);
    const [idMovie, setIdMovie] = useState("");

    const handleInput = (e) => {
        setTrailer({ ...trailer, [e.target.name]: e.target.value });
    };

    const validation = () => {
        const newErrors = {};
        if (!trailer.trailerUrl) {
            newErrors.trailerUrl = "TrailerUrl is required";
        }
        if (!trailer.idMovie) {
            newErrors.idMovie = "idMovie is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length > 0; // Trả về true nếu có lỗi
    };
    // Hàm này sẽ được gọi khi người dùng nhấn nút "Add" hoặc "Update"
    const showNotification = useNotification();

    const onSubmit = async () => {
        if (validation()) return; // Nếu có lỗi, không gửi dữ liệu
        if (trailer.id) {
            await updateDocument("trailers", trailer);
            showNotification("Trailer update success !!!", "info");
            handleClose();
        } else {
            await addDocument("trailers", trailer);
            showNotification("Trailer add success !!!", "success");
            handleClose();
        }
    };
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {trailer?.id ? "Edit Trailer" : "Add new Trailer"}
                </DialogTitle>
                <DialogContent>
                    <Autocomplete
                        disablePortal
                        fullWidth
                        options={movie}
                        sx={{ mt: 2 }}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                            // Cập nhật giá trị khi người dùng chọn
                            handleInput({
                                target: { name: "idMovie", value: newValue ? newValue.id : "" },
                            });
                        }}
                        renderInput={(params) => 
                        <TextField {...params} 
                        label="idMovie"
                        error={!!errors.idMovie}
                        helperText={errors.idMovie}
                        value={movie.find((item) => item.id === idMovie)}
                         />}

                    />
                    
                    <TextField
                        fullWidth
                        label="TrailerUrl"
                        variant="outlined"
                        name="trailerUrl"
                        sx={{ mt: 2 }}
                        value={trailer.trailerUrl}
                        onChange={handleInput}
                        helperText={errors.trailerUrl}
                        error={!!errors.trailerUrl}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={onSubmit} color="primary">
                        {trailer.id ? "Update" : "ADD"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalTrailer;