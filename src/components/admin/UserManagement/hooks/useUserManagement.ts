import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { fetchUsers, updateUserStatus } from '../../../../store/slices/adminSlice';
import { User, UserStatus } from '../../../../types';

export const useUserManagement = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector(state => state.admin);
  const [filter, setFilter] = useState('all');

  const handleStatusChange = useCallback(async (userId: string, status: UserStatus) => {
    try {
      await dispatch(updateUserStatus({ userId, status })).unwrap();
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  }, [dispatch]);

  const getFilteredUsers = useCallback((users: User[]) => {
    return users.filter(user => {
      if (filter === 'all') return true;
      return user.role === filter;
    });
  }, [filter]);

  return {
    users,
    loading,
    error,
    filter,
    setFilter,
    handleStatusChange,
    getFilteredUsers
  };
};