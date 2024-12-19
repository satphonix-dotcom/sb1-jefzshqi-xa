import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { handleApiError } from '../../utils/errorHandler';

export interface VendorState {
  profile: any;
  stats: {
    totalSales: number;
    activeProducts: number;
    pendingOrders: number;
    averageRating: number;
  };
  loading: boolean;
  error: string | null;
}

export const registerVendor = createAsyncThunk(
  'vendor/register',
  async (vendorData: any) => {
    try {
      const response = await api.post('/vendor/register', vendorData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
);

export const fetchVendorStats = createAsyncThunk(
  'vendor/fetchStats',
  async () => {
    try {
      const response = await api.get('/vendor/stats');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
);

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: {
    profile: null,
    stats: {
      totalSales: 0,
      activeProducts: 0,
      pendingOrders: 0,
      averageRating: 0
    },
    loading: false,
    error: null
  } as VendorState,
  reducers: {
    clearVendorError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(registerVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to register as vendor';
      })
      .addCase(fetchVendorStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchVendorStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch vendor stats';
      });
  }
});

export const { clearVendorError } = vendorSlice.actions;
export default vendorSlice.reducer;