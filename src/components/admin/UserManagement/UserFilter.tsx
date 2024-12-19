import React from 'react';
import { UserFilterProps } from './types';

const UserFilter: React.FC<UserFilterProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border-gray-300"
    >
      <option value="all">All Users</option>
      <option value="customer">Customers</option>
      <option value="vendor">Vendors</option>
      <option value="admin">Admins</option>
    </select>
  );
};

export default UserFilter;