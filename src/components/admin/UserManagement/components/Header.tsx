import React from 'react';
import UserFilter from './UserFilter';

interface HeaderProps {
  filter: string;
  onFilterChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ filter, onFilterChange }) => (
  <div className="p-4 border-b border-gray-200">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">Users</h3>
      <UserFilter value={filter} onChange={onFilterChange} />
    </div>
  </div>
);

export default Header;