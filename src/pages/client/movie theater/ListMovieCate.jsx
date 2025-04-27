import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoviesContext } from '../../../context/MoviesProvider';
import { ContextCategories } from '../../../context/CategoriesProvider';
import { getOjectById } from '../../../services/FunctionRepon';
import SlideShowCategory from '../../../components/client/slideshow/SlideShowCategory';

function ListMovieCate(props) {
    const { id } = useParams();
    const movies = useContext(MoviesContext);
    const category = useContext(ContextCategories);
    const [movieByCate, setMovieByCate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
       const listMovie = movies.filter((movie) => movie.listCate.some((category) => category === id));
        setMovieByCate(listMovie);
        setLoading(false);
        setTotalPages(Math.ceil(listMovie.length / 24));
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-red-500 text-xl mb-4">{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <SlideShowCategory 
                movies={movieByCate} 
                title={getOjectById(category, id)?.name || 'Phim theo thể loại'} 
            />
        </div>
    );
}

export default ListMovieCate; 