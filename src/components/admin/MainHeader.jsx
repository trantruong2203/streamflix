import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { FaPlus } from "react-icons/fa";


function MainHeader({title, handleOpen, handleSearch}) {
    return (
        <div>
             <div className='flex max-md:flex-col justify-between gap-3 my-3'>
                <div className='text-xl font-medium'>{title}</div>
                <TextField onChange={handleSearch} id="outlined-basic" label="Enter keywords..." variant="outlined" size='small' />
                <Button onClick={handleOpen}  variant="contained"><FaPlus className='mr-2' /> Add</Button>
            </div>
        </div>
    );
}

export default MainHeader;