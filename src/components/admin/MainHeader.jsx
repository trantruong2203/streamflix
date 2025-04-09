import React from 'react';
import { Button, TextField } from '@mui/material';
import { FaPlus, FaSearch, FaUpload } from 'react-icons/fa';

function MainHeader({ title, handleOpen, handleSearch, handleOpenMultiple }) {
    return (
        <div className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <div className='flex gap-2'>
                <TextField
                    size="small"
                    placeholder="Search..."
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: <FaSearch className='mr-2' />
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                    startIcon={<FaPlus />}
                >
                    Thêm mới
                </Button>
                {handleOpenMultiple && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpenMultiple}
                        startIcon={<FaUpload />}
                    >
                        Thêm nhiều
                    </Button>
                )}
            </div>
        </div>
    );
}

export default MainHeader;