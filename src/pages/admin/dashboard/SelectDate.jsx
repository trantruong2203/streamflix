import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import React, { useState } from 'react';

function SelectDate({ setMonth, setYear, month, year, title }) {

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i);
    return (
        <div className='flex gap-5 items-center border border-black rounded-t-lg p-3'>
                    <p className='text-lg font-medium'>{title}</p>
                    <Box display="flex" gap={2}>
                        {/* Select tháng */}
                        <FormControl size="small">
                            <InputLabel>Tháng</InputLabel>
                            <Select
                                value={month}
                                label="Tháng"
                                onChange={(e) => setMonth(e.target.value)}
                                sx={{ 
                                    minWidth: '120px',
                                    backgroundColor: 'white'
                                    
                                }}
                            >
                                {[...Array(12)].map((_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>
                                        Tháng {i + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Select năm */}
                        <FormControl size="small">
                            <InputLabel>Năm</InputLabel>
                            <Select
                                value={year}
                                label="Năm"
                                onChange={(e) => setYear(e.target.value)}
                                sx={{ 
                                    minWidth: '120px',
                                    backgroundColor: 'white'
                                }}
                            >
                                {years.map((y) => (
                                    <MenuItem key={y} value={y}>
                                        {y}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
    );
}

export default SelectDate;