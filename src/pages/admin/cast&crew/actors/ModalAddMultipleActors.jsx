import React, { useState } from 'react';
import { Modal, Box, Button, Typography, TextField, styled } from "@mui/material";
import { useNotification } from "../../../../context/NotificationProvide";
import { addMultipleDocuments } from "../../../../services/firebaseService";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

function ModalAddMultipleActors({ open, handleClose }) {
    const [jsonData, setJsonData] = useState('');
    const [errors, setErrors] = useState('');
    const showNotification = useNotification();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    setJsonData(JSON.stringify(data, null, 2));
                    setErrors('');
                } catch (error) {
                    setErrors('File JSON không hợp lệ');
                    setJsonData('');
                }
            };
            reader.readAsText(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const actors = JSON.parse(jsonData);
            if (!Array.isArray(actors)) {
                setErrors('Dữ liệu phải là một mảng các actor');
                return;
            }

            await addMultipleDocuments("actors", actors);
            showNotification("Thêm nhiều actor thành công!", "success");
            handleClose();
        } catch (error) {
            setErrors('Có lỗi xảy ra: ' + error.message);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 24,
                p: 3,
            }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Thêm Nhiều Actor
                </Typography>
                
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{ mb: 2 }}
                >
                    Tải lên file JSON
                    <VisuallyHiddenInput
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                    />
                </Button>

                <TextField
                    fullWidth
                    multiline
                    rows={10}
                    value={jsonData}
                    onChange={(e) => setJsonData(e.target.value)}
                    error={!!errors}
                    helperText={errors}
                    sx={{ mb: 2 }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button onClick={handleClose} color="secondary">
                        Hủy
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        color="primary"
                        disabled={!jsonData || !!errors}
                    >
                        Thêm
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalAddMultipleActors; 