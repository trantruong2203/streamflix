// hooks/useFetchMovie.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchMovie(slug) {
    const [movieData, setMovieData] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const URL_API_MOVIE = import.meta.env.VITE_API_BASE_URL_MOVIE || 'https://phimapi.com/phim/';

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const baseUrl = URL_API_MOVIE.endsWith('/') ? URL_API_MOVIE : `${URL_API_MOVIE}/`;
                const res = await axios.get(`${baseUrl}${slug}`);
                setMovieData(res.data.movie);
                setEpisodes(res.data.episodes || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchMovie();
    }, [slug, URL_API_MOVIE]);

    return { movieData, episodes, loading, error };
}
