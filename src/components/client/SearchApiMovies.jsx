import React, { useState, useEffect } from "react";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SearchApiMovies() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_V1;
    const endPoint = "tim-kiem";

    // Debounce search
    useEffect(() => {
        if (!keyword.trim()) {
            setResults([]);
            return;
        }

        const delay = setTimeout(() => {
            fetchSearch(keyword);
        }, 300);

        return () => clearTimeout(delay);
    }, [keyword, API_BASE_URL]);

    const fetchSearch = async (key) => {
        try {
            const res = await axios.get(`${API_BASE_URL}${endPoint}?keyword=${key}`);

            const items = res.data?.data?.items || [];
            setResults(res.data.status ? items : []);
            setError(null);
        } catch (err) {
            setError(err.message);
            setResults([]);
        }
    };

    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                id="movie-search"
                size="small"
                freeSolo
                options={results}
                getOptionLabel={(option) =>
                    typeof option === "string" ? option : option?.name || ""
                }
                renderOption={(props, option) => (
                    <li
                        {...props}
                        key={option.id}
                        onClick={() => navigate(`/movie/${option.slug}`)}
                        className="flex items-center gap-3 p-2 hover:bg-gray-700 bg-[#1a1a1a]"
                    >
                        <img
                            src={`https://phimimg.com/${option.thumb_url}`}
                            alt={option.name}
                            className="w-12 h-16 object-cover rounded"
                            onError={(e) =>
                                (e.target.src =
                                    "https://via.placeholder.com/300x450?text=No+Image")
                            }
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
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#1a1a1a",
                                borderRadius: "4px",
                                "& fieldset": { borderColor: "transparent" },
                                "&:hover fieldset": {
                                    borderColor: "rgba(255,255,255,0.3)",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "rgba(255,255,255,0.5)",
                                },
                                "& input": {
                                    color: "white",
                                    padding: "8px 12px",
                                    "&::placeholder": {
                                        color: "rgba(255,255,255,0.7)",
                                    },
                                },
                            },
                        }}
                    />
                )}
                onInputChange={(e, value) => setKeyword(value)}
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}
        </Stack>
    );
}

export default SearchApiMovies;
