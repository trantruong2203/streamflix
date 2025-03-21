import React from "react";
import { Modal, Box, Button, Typography, TextField, styled, Avatar } from "@mui/material";
import { useNotification } from "../../../../context/NotificationProvide";
import { addDocument, updateDocument } from "../../../../services/firebaseService";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// Xóa dòng import không cần thiết này
// import { Margin } from "@mui/icons-material";


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

function ModalActor({ open, actor = {}, setActor, handleClose, errors = {}, setErrors }) {
    const showNotification = useNotification();

    const handleInput = (e) => {
        setActor({ ...actor, [e.target.name]: e.target.value });
    };

    const validation = () => {
        const newErrors = {};
        if (!actor?.name) {
            newErrors.name = "Name is required";
            newErrors.description = "Description is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Trả về `false` nếu có lỗi
    };

    const onSubmit = async () => {
        if (!validation()) return; // Nếu có lỗi, dừng lại

        if (actor.id) {
            await updateDocument("actors", actor);
            showNotification("Actor update success!!!", "info");
        } else {
            await addDocument("actors", actor);
            showNotification("Actor add success!!!", "info");
        }
        handleClose();
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0]; // Lấy file đầu tiên từ input
        if (file) {
          const result = new FileReader(); // Tạo đối tượng FileReader để đọc file
          result.readAsDataURL(file); // Đọc file dưới dạng base64
          result.onload = () => {
            setActor({ ...actor, imgUrl: result.result }); // Lưu ảnh vào state
          }
        }
      };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "white",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 3,
                }}
            >
                <Typography variant="h6">
                    {actor?.id ? "Edit Actor" : "Add New Actor"}
                </Typography>
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    name="name"
                    sx={{ mt: 2 }}
                    value={actor?.name}
                    onChange={handleInput}
                    helperText={errors.name}
                    error={!!errors.name}
                />
                <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    name="description"
                    sx={{ mt: 2 }}
                    multiline
                    rows={3}
                    value={actor.description}
                    onChange={handleInput}
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{mt: 2}}
                >
                    Upload files
                    <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileUpload}

                        multiple
                    />
                </Button>
                <Avatar sx={{width:"100px", height:"100px", margin: "auto", marginTop:"20px"}} src={actor.imgUrl} />
                <Box sx={{ mt: 2, textAlign: "right" }}>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary" sx={{ ml: 2 }}>
                        {actor?.id ? "Update" : "ADD"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalActor;
