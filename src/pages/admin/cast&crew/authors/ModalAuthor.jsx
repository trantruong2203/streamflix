import React from 'react';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useNotification } from '../../../../context/NotificationProvide';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

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

function ModalAuthor({ handleClose, open, author, setAuthor, error, setError, handleEdit }) {

    const showNotification = useNotification();
    const handleInput = (e) => {
        setAuthor({ ...author, [e.target.name]: e.target.value });
    };


    const onSubmit = async () => {
        if (validation()) return; // Nếu có lỗi, không gửi dữ liệu
        try {
            if (author?.id) {
                await updateDocument("authors", author);
                showNotification("Author updated successfully!", "info");
            } else {
                await addDocument("authors", author);
                showNotification("Author added successfully!", "info");
            }
            handleClose();
        } catch (error) {
            showNotification("Error updating author!", "error");
            console.error("Error:", error);
        }
    };

    const validation = () => {
        const newErrors = {};
        if (!author.name) {
            newErrors.name = "Name is required";
        }
        if (!author.description) {
            newErrors.description = "Description is required";
        }
        setError(newErrors);
        return Object.keys(newErrors).length > 0;
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0]; // Lấy file đầu tiên từ input
        if (file) {
          const result = new FileReader(); // Tạo đối tượng FileReader để đọc file
          result.readAsDataURL(file); // Đọc file dưới dạng base64
          result.onload = () => {
            setAuthor({ ...author, imgUrl: result.result }); // Lưu ảnh vào state
          }
        }
      };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {author.id ? "Edit Author" : "Add new Author"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        name="name"
                        sx={{ mt: 2 }}
                        onChange={handleInput}
                        value={author?.name}
                        error={!!error.name}
                        helperText={error.name}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        name="description"
                        sx={{ mt: 2 }}
                        multiline
                        rows={3}
                        onChange={handleInput}
                        value={author?.description}
                        error={!!error.description}
                        helperText={error.description}
                    />
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
                    <Avatar sx={{ width: "100px", height: "100px", margin: "auto", marginTop: "20px" }} src={author.imgUrl} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='secondary' >Cancel</Button>
                    <Button onClick={onSubmit} color='primary'>
                        {author.id ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalAuthor;