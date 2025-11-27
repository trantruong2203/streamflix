import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import { useMovie } from '../hooks/useListMovie';

jest.mock('axios');

const mockData = {
    data: {
        status: true,
        items: [{ _id: '1', title: 'Movie 1' }],
        pagination: { totalItems: 1 },
        dataseoOnPage: { titleHead: 'Page Title' }
    }
};

describe('useMovie', () => {
    it('should fetch movies on mount', async () => {
        axios.get.mockResolvedValue(mockData);

        const { result, waitForNextUpdate } = renderHook(() => useMovie('popular'));

        expect(result.current.loading).toBe(true);

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.movies).toEqual([{ _id: '1', title: 'Movie 1' }]);
        expect(result.current.totalPages).toBe(1);
        expect(result.current.listTitle).toEqual(['Page Title']);
    });

    it('should handle filter changes', async () => {
        axios.get.mockResolvedValue(mockData);

        const { result, waitForNextUpdate } = renderHook(() => useMovie('popular'));

        await waitForNextUpdate();

        act(() => {
            result.current.handleFilterChange({ target: { name: 'year', value: '2023' } });
        });

        expect(result.current.filters.year).toBe('2023');
        expect(result.current.filters.page).toBe(1);
    });

    it('should handle page changes', async () => {
        axios.get.mockResolvedValue(mockData);
        const { result, waitForNextUpdate } = renderHook(() => useMovie('popular'));

        await waitForNextUpdate();

        act(() => {
            result.current.handlePageChange(2);
        });
        
        expect(result.current.filters.page).toBe(1);
    });

    it('should reset filters', async () => {
        axios.get.mockResolvedValue(mockData);
        const { result, waitForNextUpdate } = renderHook(() => useMovie('popular'));
        await waitForNextUpdate();

        act(() => {
            result.current.handleFilterChange({ target: { name: 'year', value: '2023' } });
        });

        act(() => {
            result.current.resetFilters();
        });

        expect(result.current.filters).toEqual({
            year: '',
            country: '',
            sort_field: 'modified.time',
            sort_lang: '',
            sort_type: '',
            page: 1,
        });
    });

    it('should handle API errors', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));

        const { result, waitForNextUpdate } = renderHook(() => useMovie('popular'));

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('Lỗi kết nối server!');
    });
});
