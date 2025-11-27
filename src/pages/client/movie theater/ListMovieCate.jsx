import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoviesContext } from '../../../context/MoviesProvider';
import { ContextCategories } from '../../../context/CategoriesProvider';
import { getOjectById } from '../../../services/FunctionRepon';
import SlideShowCategory from '../../../components/client/slideshow/SlideShowCategory';

function ListMovieCate() {
    const { id } = useParams();
    const movies = useContext(MoviesContext);
    const categories = useContext(ContextCategories);

    const [movieByCate, setMovieByCate] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        try {
            if (!movies.length) return;

            const filtered = movies.filter((movie) =>
                movie.listCate.includes(id)
            );

            setMovieByCate(filtered);
            setTotalPages(Math.ceil(filtered.length / 24));
        } catch (err) {
            setError('Lỗi tải danh sách phim.');
            console.error(err);
        }
    }, [id, movies]);

    const currentCateName = getOjectById(categories, id)?.name || "Phim theo thể loại";

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
                title={currentCateName}
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
}

export default ListMovieCate;
