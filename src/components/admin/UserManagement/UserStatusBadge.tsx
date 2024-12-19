import React from 'react';
import { UserStatusBadgeProps } from './types';

const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      case 'banned':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses()}`}>
      {status}
    </span>
  );
};

export default UserStatusBadge;