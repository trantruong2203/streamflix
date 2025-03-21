import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, styled, TextField } from '@mui/material';
import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNotification } from "../../../../context/NotificationProvide";
import { addDocument, updateDocument } from "../../../../services/firebaseService";

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


function ModalCharacter({ open, handleClose, character, setCharacter, errors, setErrors }) {
    
    const showNotification = useNotification();

    const handleInput = (e) => {
        setCharacter({...character, [e.target.name] : e.target.value})
    };

    const validation = () => {
        const newErrors = {};
        if(!character.name){
            newErrors.name = "Name is required"
        }
        if(!character.description){
            newErrors.description = "Description is required"
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async () => {
        if(validation()){
            if(character.id){
                await updateDocument("characters", character.id, character);
                showNotification("Update successfully", "success");
            } else {
                await addDocument("characters", character);
                showNotification("Add new successfully", "success");
            }
            handleClose();
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0]; // Lấy file đầu tiên từ input
        if (file) {
            const result = new FileReader(); // Tạo đối tượng FileReader để đọc file
            result.readAsDataURL(file); // Đọc file dưới dạng base64
            result.onload = () => {
                setCharacter({...character, imgUrl: result.result }); // Lưu ảnh vào state
            }
        }
    };
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                
                <DialogTitle>
                    {character?.id ? "Edit Character" : "Add new Character"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        name="name"
                        sx={{ mt: 2 }}
                        value={character.name}
                        onChange={handleInput}
                        helperText={errors.name}
                        error={!!errors.name}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        name="description"
                        sx={{ mt: 2 }}
                        value={character.description}
                        onChange={handleInput}
                        helperText={errors.description}
                        error={!!errors.description}
                    />
                </DialogContent>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{ mt: 2 }}
                >
                    Upload files
                    <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileUpload}

                        multiple
                    />
                </Button>
                <Avatar sx={{ width: "100px", height: "100px", margin: "auto", marginTop: "20px" }} src={character.imgUrl} />
                <Box sx={{ mt: 2, textAlign: "right" }}>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary" sx={{ ml: 2 }}>
                        {character?.id ? "Update" : "ADD"}
                    </Button>
                </Box>
            </Dialog>
        </div>
    );
}

export default ModalCharacter;