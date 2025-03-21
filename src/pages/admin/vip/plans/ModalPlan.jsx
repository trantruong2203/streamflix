import { Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions } from '@mui/material';
import React from 'react';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
import { useNotification } from '../../../../context/NotificationProvide';

function ModalPlan({ handleClose, open, plan, setPlan, error, setError }) {

    const handleInput = (e) => {
        setPlan({ ...plan, [e.target.name]: e.target.value });
    };

    const showNotification = useNotification();

    const onSubmit = async () => {
        if (validation()) return; // Nếu có lỗi, không gửi dữ liệu  
        if (plan.id) {
            await updateDocument("plans", plan );
            showNotification("Plan updated success", "info" );
            handleClose();
        } else {
        await addDocument("plans", plan )
        showNotification("Plan added success", "success" );
        handleClose();
    }};

    const validation = () => {
        const newErrors = {};
        if (!plan.level) {
            newErrors.level = "Level is required";
        }
        if (!plan.PricePerMonth) {
            newErrors.PricePerMonth = "Price Per Month is required";
        }
        if (!plan.title) {
            newErrors.title = "Title is required";
        }

        setError(newErrors);
        return Object.keys(newErrors).length > 0;   
    };
return (
    <div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                {plan.id ? "Edit Plan" : "Add Plan"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Level"
                    fullWidth
                    variant="outlined"
                    name='level'
                    value={plan.level}
                    onChange={handleInput}
                    helperText={error.level}
                    error={!!error.level}
                />
                <TextField
                    margin="dense"
                    label="Price Per Month"
                    fullWidth
                    variant="outlined"
                    name='PricePerMonth'
                    value={plan.PricePerMonth}
                    onChange={handleInput}
                    helperText={error.PricePerMonth}
                    error={!!error.PricePerMonth}    
                />
                <TextField
                    margin="dense"
                    label="Title"
                    fullWidth
                    variant="outlined"
                    name='title'
                    value={plan.title}
                    onChange={handleInput}
                    helperText={error.title}
                    error={!!error.title}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onSubmit} color="primary" variant="contained">
                    {plan.id? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    </div>
);
}

export default ModalPlan;