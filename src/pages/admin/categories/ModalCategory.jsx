import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { addDocument, updateDocument } from "../../../services/firebaseService";
import { useNotification } from '../../../context/NotificationProvide';

function ModalCategory({ open, handleClose, category, setCategory, errors, setErrors
}) {
    const showNotification = useNotification();
    
    const handleInput = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const onSubmit = async () => {
        if (validation()) return; // Nếu có lỗi, không gửi dữ liệu
        if (category.id) {
            await updateDocument("categories", category);
            showNotification("Category update success !!!", "info");
            handleClose();
        } else {
            await addDocument("categories", category);
            showNotification("Category add success !!!", "success");
            handleClose();
        }
    };

    const validation = () => {
        const newErrors = {};
        if (!category.name) {
            newErrors.name = "Name is required";
        }
        if (!category.description) {
            newErrors.description = "Description is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length > 0;

    };


    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {category?.id ? "Edit Category" : "Add new category"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        name="name"
                        sx={{ mt: 2 }}
                        value={category.name}
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
                        value={category.description}
                        onChange={handleInput}
                        helperText={errors.description}
                        error={!!errors.description}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={onSubmit} color="primary">
                        {category.id ? "Update" : "ADD"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalCategory;