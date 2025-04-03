import { Avatar, Box, Button, Dialog, DialogTitle, MenuItem, TextField } from '@mui/material';
import React from 'react';


function ModalChooseCategories({ open, handleClose, dataChoose, typeChoose, handleSelect, dataSelect, handleSearch, find }) {

    const checkId = (id) => dataSelect.includes(id);
    const searchChoose = dataChoose.filter((item) =>
        item.name?.toLowerCase().includes(find?.toLowerCase())
    );

    return (
        <div>
            <Dialog onClose={handleClose} open={open} PaperProps={{
                sx: { width: "40vw", maxWidth: "80vw" }, // Giới hạn maxWidth để không quá lớn
            }} >
                <div className="flex items-center justify-between p-3">
                    <DialogTitle sx={{ fontSize: 40, fontFamily: 'fantasy', margin: 0 }}>
                        Choose {typeChoose}
                    </DialogTitle>
                    <TextField 
                        size="small"
                        placeholder={`Search ${typeChoose}...`}
                        sx={{ width: '200px' }}
                        variant="outlined"
                        onChange={handleSearch}
                    />
                </div>
                <div className="mt-2 flex flex-wrap gap-2 p-3">
                    {searchChoose.map(
                        (category, index) => (
                            typeChoose === "categories" ?
                             <Button sx={{ background: checkId(category.id) ? "gray" : "", color: checkId(category.id) ? "white" : "" }} key={index} onClick={() => handleSelect(category.id,typeChoose)} variant="outlined">
                                {category.name}
                            </Button> : <>
                                <div onClick={() => handleSelect(category.id,typeChoose)} key={index}
                                    className='flex flex-col items-center font-bold p-3'>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={category.imgUrl}
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            border: checkId(category.id) ? '2px solid #1976d2' : 'none',
                                            boxShadow: checkId(category.id) ? '0 0 10px #1976d2' : 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.1)'
                                            }
                                        }}
                                    />
                                    <div className= {`text-[10px] ${checkId(category.id) ? "text-blue-600" : ""}`}>{category.name}</div>
                                </div>

                            </>
                        )
                    )}


                </div>

                <Box sx={{ mt: 2, textAlign: "right", p: 2 }}>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>

                </Box>
            </Dialog>
        </div>
    );
}

export default ModalChooseCategories;