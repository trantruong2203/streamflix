import { Dialog, DialogContent, DialogTitle, TextField, Button, DialogActions, Select, FormControl, MenuItem, InputLabel } from '@mui/material';
import React, { useContext } from 'react';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
import { useNotification } from '../../../../context/NotificationProvide';
import { PlansContext } from '../../../../context/PlansProvider';
import { getOjectById } from '../../../../services/FunctionRepon';

function ModalPackage({ handleClose, open, packageData, setPackageData, error, setError }) {
    const plans = useContext(PlansContext)

    const handleInput = (e) => {
        setPackageData({ ...packageData, [e.target.name]: e.target.value });
    };

    const showNotification = useNotification();

    const onSubmit = async () => {
        if (validation()) return; // Nếu có lỗi, không gửi dữ liệu  
        if (packageData.id) {
            await updateDocument("packages", packageData);
            showNotification("Package updated success", "info");
            handleClose();
        } else {
            await addDocument("packages", packageData)
            showNotification("Package added success", "success");
            handleClose();
        }
    };

    const validation = () => {
        const newErrors = {};
        if (!packageData.planId) {
            newErrors.planId = "Plan Id is required";
        }
        if (!packageData.discount) {
            newErrors.discount = "Discount is required";
        }
        if (!packageData.time) {
            newErrors.time = "Time is required";
        }

        setError(newErrors);
        return Object.keys(newErrors).length > 0;
    };

    return (
        <div>
            <Dialog 
                open={open} 
                onClose={handleClose}
                TransitionProps={{
                    enter: true,
                    timeout: 500
                }}
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
                        minWidth: '400px'
                    }
                }}
            >
                <DialogTitle sx={{ 
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '16px 24px',
                    marginBottom: '16px'
                }}>
                    {packageData.id ? "Edit Package" : "Add Package"}
                </DialogTitle>
                <DialogContent sx={{ padding: '24px' }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Plan</InputLabel>
                        <Select
                            label="Plan"
                            fullWidth
                            variant="outlined"
                            name='planId'
                            value={packageData.planId}
                            onChange={handleInput}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#2196F3',
                                    },
                                },
                            }}
                        >
                            {plans.map((plan) => (
                                <MenuItem key={plan.id} value={plan.id}>
                                    {plan.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Discount %"
                        type="number"
                        fullWidth
                        variant="outlined"
                        name='discount'
                        value={packageData.discount}
                        onChange={handleInput}
                        helperText={error.discount}
                        error={!!error.discount}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Time (month)"
                        fullWidth
                        type="number"
                        variant="outlined"
                        name='time'
                        value={packageData.time}
                        onChange={handleInput}
                        helperText={error.time}
                        error={!!error.time}
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions sx={{ padding: '16px 24px', background: '#f8f9fa' }}>
                    <Button 
                        onClick={handleClose} 
                        color="secondary"
                        sx={{
                            '&:hover': {
                                background: 'rgba(0, 0, 0, 0.04)',
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={onSubmit} 
                        color="primary" 
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                            }
                        }}
                    >
                        {packageData.id ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalPackage;