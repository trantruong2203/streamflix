import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_V1 || 'https://phimapi.com/v1/api/';
const DANH_SACH_SLUGS = [
    'phim-le',
    'phim-bo',
    'hoat-hinh',
    'tv-shows',
    'phim-moi-cap-nhat-v2',
    'phim-moi-cap-nhat',
    'phim-thuyet-minh',
    'phim-long-tieng',
];

const QUOC_GIA_SLUGS = [
    'au-my',
    'han-quoc',
    'trung-quoc',
    'nhat-ban',
    'thai-lan',
    'hong-kong',
    'viet-nam',
    'dai-loan',
    'an-do',
    'anh',
    'phap',
    'duc',
];

export function getCategoryEndpoint(slug) {
    if (!slug) return 'the-loai/';
    if (DANH_SACH_SLUGS.includes(slug)) {
        return 'danh-sach/';
    }
    if (QUOC_GIA_SLUGS.includes(slug)) {
        return 'quoc-gia/';
    }
    return 'the-loai/';
}
const MOVIES_PER_PAGE = 24;

const initialFilters = {
    year: '',
    country: '',
    sort_field: 'modified.time',
    sort_lang: '',
    sort_type: 'desc',
    page: 1,
};

export function useMovie(typeList) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [listTitle, setListTitle] = useState("");
    const [filters, setFilters] = useState(initialFilters);

    const fetchMovies = useCallback(async () => {
        if (!typeList) return;

        setLoading(true);
        setError(null);

        try {
            const cleanFilters = Object.fromEntries(
                Object.entries(filters).filter(([, v]) => v !== '')
            );

            const queryParams = new URLSearchParams(cleanFilters).toString();
            const endPoint = getCategoryEndpoint(typeList);
            const url = `${API_BASE_URL}${endPoint}${typeList}?${queryParams}&limit=${MOVIES_PER_PAGE}`;

            const response = await axios.get(url);

            if (response.data.status) {
                setMovies(response.data.data.items);
                setTotalPages(
                    response.data.data.params.pagination.totalItems > 0
                        ? Math.ceil(response.data.data.params.pagination.totalItems / MOVIES_PER_PAGE)
                        : 1
                );
                setListTitle(
                    (response.data.data?.seoOnPage?.titleHead || response.data.data?.titlePage || '')
                        ?.split("|")
                        .map(i => i.trim()) || []
                );
            } else {
                setError('Không tải được dữ liệu');
            }
        } catch (err) {
            console.error(err);
            setError('Lỗi kết nối server!');
        } finally {
            setLoading(false);
        }
    }, [typeList, filters]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value,
            page: 1
        }));
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setFilters(prev => ({ ...prev, page: newPage }));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    const resetFilters = () => {
        setFilters(initialFilters);
    };

    return {
        movies,
        loading,
        error,
        totalPages,
        listTitle,
        filters,
        handleFilterChange,
        handlePageChange,
        resetFilters,
        initialFilters
    };
}
