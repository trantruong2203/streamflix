import React from 'react';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function SearchMovie({movies}) {
    const navigate = useNavigate();
    return (
        <div>
             <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                id="movie-search"
                size="small"
                freeSolo
                options={movies}
                getOptionLabel={(option) => option.name || ''}
                renderOption={(props, option) => (
                    <li {...props} 
                    onClick={() => navigate(`/main/movies/detail/${option.id}`)} 
                    className="flex items-center gap-3 p-2 hover:bg-gray-700 bg-[#1a1a1a]">
                        <img 
                            src={option.imgUrl} 
                            alt={option.name}
                            className="w-12 h-16 object-cover rounded"
                        />
                        <div 
                           
                            className="flex flex-col cursor-pointer"
                        >
                            <span className="text-white font-medium">{option.name}</span>
                            <span className="text-sm text-gray-400">{option.year}</span>
                        </div>
                    </li>
                )}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        placeholder="Tìm kiếm phim..."
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#1a1a1a',
                                borderRadius: '4px',
                                '& fieldset': {
                                    borderColor: 'transparent',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                },
                                '& input': {
                                    color: 'white',
                                    padding: '8px 12px',
                                    '&::placeholder': {
                                        color: 'rgba(255, 255, 255, 0.7)',
                                    },
                                },
                            },
                        }}
                    />
                )}
            />
        </Stack>
        </div>
    );
}

export default SearchMovie;