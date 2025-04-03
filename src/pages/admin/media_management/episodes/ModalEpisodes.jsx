import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNotification } from '../../../../context/NotificationProvide';
import { MoviesContext } from '../../../../context/MoviesProvider';
import { addDocument, updateDocument } from '../../../../services/firebaseService';

function ModalEpisodes({ open, handleClose, setEpisode, episode, errors, setErrors }) {
    const movie = useContext(MoviesContext);
    const [idMovie, setIdMovie] = useState("");

    const handleInput = (e) => {
        setEpisode({ ...episode, [e.target.name]: e.target.value });
    };

    const validation = () => {
        const newErrors = {};
        if (!episode.episodesNumber) {
            newErrors.episodesNumber = "EpisodesNumber is required";
        }
        if (!episode.episodesUrl) {
            newErrors.episodesUrl = "EpisodesUrl is required";
        }
        if (!episode.idMovie) {
            newErrors.idMovie = "idMovie is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length > 0; // Trả về true nếu có lỗi
    };
    // Hàm này sẽ được gọi khi người dùng nhấn nút "Add" hoặc "Update"
    const showNotification = useNotification();

    const onSubmit = async () => {
        if (validation()) return; // Nếu có lỗi, không gửi dữ liệu
        if (episode.id) {
            await updateDocument("episodes", episode);
            showNotification("Episodes update success !!!", "info");
            handleClose();
        } else {
            await addDocument("episodes", episode);
            showNotification("Episodes add success !!!", "success");
            handleClose();
        }
    };
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {episode?.id ? "Edit Episode" : "Add new Episode"}
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
                        label="EpisodesNumber"
                        variant="outlined"
                        name="episodesNumber"
                        sx={{ mt: 2 }}
                        value={episode.episodesNumber}
                        onChange={handleInput}
                        helperText={errors.episodesNumber}
                        error={!!errors.episodesNumber}
                    />
                    <TextField
                        fullWidth
                        label="EpisodesUrl"
                        variant="outlined"
                        name="episodesUrl"
                        sx={{ mt: 2 }}
                        value={episode.episodesUrl}
                        onChange={handleInput}
                        helperText={errors.episodesUrl}
                        error={!!errors.episodesUrl}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={onSubmit} color="primary">
                        {episode.id ? "Update" : "ADD"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalEpisodes;