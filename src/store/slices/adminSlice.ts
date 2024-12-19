import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { User } from '../../types';
import { handleApiError } from '../../utils/errorHandler';

interface AdminState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  users: [],
  loading: false,
  error: null
};

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async () => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'admin/updateUserStatus',
  async ({ userId, status }: { userId: string; status: string }) => {
    try {
      const response = await api.patch(`/admin/users/${userId}/status`, { status });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  }
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;