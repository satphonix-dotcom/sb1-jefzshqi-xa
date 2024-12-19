import React from 'react';
import { UserStatusSelectProps } from './types';
import { UserStatus } from '../../../types';

const UserStatusSelect: React.FC<UserStatusSelectProps> = ({ value, onChange, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as UserStatus);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={disabled}
      className="rounded-md border-gray-300 text-sm disabled:opacity-50"
    >
      <option value="active">Active</option>
      <option value="suspended">Suspended</option>
      <option value="banned">Banned</option>
    </select>
  );
};

export default UserStatusSelect;