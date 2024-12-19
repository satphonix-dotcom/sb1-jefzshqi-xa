```typescript
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchUsers, updateUserStatus } from '../../../store/slices/adminSlice';
import { UserStatus } from '../../../types';
import UserTable from './components/UserTable';
import UserFilter from './components/UserFilter';

const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector(state => state.admin);
  const [filter, setFilter] = React.useState('all');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleStatusChange = async (userId: string, status: UserStatus) => {
    try {
      await dispatch(updateUserStatus({ userId, status })).unwrap();
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  const filteredUsers = React.useMemo(() => {
    return users.filter(user => {
      if (filter === 'all') return true;
      return user.role === filter;
    });
  }, [users, filter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Users</h3>
          <UserFilter value={filter} onChange={setFilter} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <UserTable users={filteredUsers} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
};

export default UserManagement;
```