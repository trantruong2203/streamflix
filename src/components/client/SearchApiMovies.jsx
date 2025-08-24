import React, { useState, useEffect } from 'react';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchApiMovies() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [image, setImage] = useState('');

    useEffect(() => {
        if (keyword.trim() === '') {
            setResults([]);
            setError(null);
            return;
        }

        const fetchSearchAPI = async () => {
            try {
                const res = await axios.get(`https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}`);
                if (res.data && res.data.data && res.data.data.items) {
                    setResults(res.data.data.items);
                } else {
                    setResults([]);
                }
            } catch (err) {
                setError(err.message);
                setResults([]);
            }
        };

        fetchSearchAPI();
    }, [keyword]);

    useEffect(() => {
        if (results.length > 0) {
            const fetchImage = async () => {
                results.map(async (item) => {
                    const res = await axios.get(`https://phimapi.com/image.php?url=${item.thumb_url}`);
                    setImage(res.data.data.items[0].poster_url);
                    console.log(res.data.data.items[0].poster_url);
                });
            }
            fetchImage();
        }
    }, [results]);


    return (
        <div>
            <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    id="movie-search"
                    size="small"
                    freeSolo
                    options={results || []}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') return option;
                        return option?.name || '';
                    }}
                    renderOption={(props, option) => (
                        <li {...props}
                            onClick={() => navigate(`/movie/${option.slug}`)}
                            key={option.id}
                            className="flex items-center gap-3 p-2 hover:bg-gray-700 bg-[#1a1a1a]">
                            <img
                                src={image}
                                className="w-12 h-16 object-cover rounded"
                            />
                            <div className="flex flex-col cursor-pointer">
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
                    onInputChange={(e, value) => setKeyword(value)} // ✅ xử lý text nhập vào
                />

            </Stack>
        </div>
    );
}

export default SearchApiMovies;