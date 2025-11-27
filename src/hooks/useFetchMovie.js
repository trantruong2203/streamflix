// hooks/useFetchMovie.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchMovie(slug) {
    const [movieData, setMovieData] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const URL_API_MOVIE = import.meta.env.VITE_API_BASE_URL_MOVIE;

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axios.get(`${URL_API_MOVIE}${slug}`);
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
