import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { Product } from '../../types';

interface SearchState {
  results: Product[];
  filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
    sortBy: string;
  };
  loading: boolean;
  error: string | null;
}

export const searchProducts = createAsyncThunk(
  'search/searchProducts',
  async (params: { query: string; filters: any }) => {
    const response = await api.get('/products/search', { params });
    return response.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    filters: {
      category: '',
      minPrice: 0,
      maxPrice: 0,
      sortBy: 'relevance'
    },
    loading: false,
    error: null
  } as SearchState,
  reducers: {
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSearch: (state) => {
      state.results = [];
      state.filters = {
        category: '',
        minPrice: 0,
        maxPrice: 0,
        sortBy: 'relevance'
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Search failed';
      });
  }
});

export const { updateFilters, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;