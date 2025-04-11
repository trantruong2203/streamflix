import React, { useContext } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Box,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    Slide,
    Fade,
    styled
} from '@mui/material';
import { PlansContext } from '../../../../context/PlansProvider';
import { addDocument, updateDocument } from '../../../../services/firebaseService';
import { useNotification } from '../../../../context/NotificationProvide';

// Tạo styled component cho Dialog
const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
        }
    },
    '& .MuiDialogTitle-root': {
        background: 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)',
        color: 'white',
        padding: theme.spacing(2),
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    }
}));

// Transition component cho Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ModalFeature({ open, featureData, setFeatureData, handleClose, error, setError }) {
    const plans = useContext(PlansContext);
    const showNotification = useNotification();

    const handleChange = (e) => {
        setFeatureData({ ...featureData, [e.target.name]: e.target.value });
    }

    const validation = () => {
        const newErrors = {};
        if (!featureData.name) newErrors.name = 'Name is required';
        if (!featureData.description) newErrors.description = 'Description is required';
        if (!featureData.plan) newErrors.plan = 'Plan is required';
        if (!featureData.available) newErrors.available = 'Available status is required';
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async () => {
        if (validation()) return; // Nếu có lỗi, không gửi dữ liệu  
        if (featureData.id) {
            await updateDocument("features", featureData);
            showNotification("Feature updated success", "info");
            handleClose();
        } else {
            await addDocument("features", featureData)
            showNotification("Feature added success", "success");
            handleClose();
        }
    };

    return (
        <StyledDialog 
            onClose={handleClose} 
            open={open} 
            fullWidth 
            maxWidth="sm"
            TransitionComponent={Transition}
            TransitionProps={{ timeout: 500 }}
        >
            <DialogTitle>
                {featureData.id ? 'Update Feature' : 'Add Feature'}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <FormControl fullWidth error={!!error.plan}>
                        <InputLabel>Plan</InputLabel>
                        <Select
                            name="plan"
                            value={featureData.plan || ''}
                            label="Plan"
                            onChange={handleChange}
                            sx={{
                                '&:hover': {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#2196f3',
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
                        {error.plan && (
                            <Box sx={{ color: 'error.main', mt: 1, fontSize: '0.75rem' }}>
                                {error.plan}
                            </Box>
                        )}
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={featureData.description || ''}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        error={!!error.description}
                        helperText={error.description}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: '#2196f3',
                                },
                            },
                        }}
                    />

                    <FormControl>
                        <FormLabel>Available</FormLabel>
                        <RadioGroup
                            name="available"
                            value={featureData.available || 'Yes'}
                            onChange={handleChange}
                        >
                            <FormControlLabel 
                                value="Yes" 
                                control={<Radio sx={{
                                    '&.Mui-checked': {
                                        color: '#2196f3',
                                    },
                                }} />} 
                                label="Yes" 
                            />
                            <FormControlLabel 
                                value="No" 
                                control={<Radio sx={{
                                    '&.Mui-checked': {
                                        color: '#2196f3',
                                    },
                                }} />} 
                                label="No" 
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={handleClose}
                    sx={{
                        color: '#666',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained" 
                    sx={{
                        background: 'linear-gradient(90deg, #2196f3 0%, #1976d2 100%)',
                        '&:hover': {
                            background: 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)',
                        },
                    }}
                >
                    {featureData.id ? 'Update' : 'Add'}
                </Button>
            </DialogActions>
        </StyledDialog>
    );
}

export default ModalFeature;