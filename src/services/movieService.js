import axios from 'axios';

const API_BASE_URL = 'https://phimapi.com/v1/api';

export const searchMovies = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tim-kiem`, {
      params: {
        keyword: params.keyword || '',
        page: params.page || 1,
        sort_field: params.sort_field || 'created_at',
        sort_type: params.sort_type || 'desc',
        sort_lang: params.sort_lang || 'vi',
        category: params.category || '',
        country: params.country || '',
        year: params.year || '',
        limit: params.limit || 20
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}; 