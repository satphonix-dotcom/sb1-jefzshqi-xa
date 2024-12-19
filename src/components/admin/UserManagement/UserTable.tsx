import React from 'react';
import { UserTableProps } from './types';
import { formatDate } from '../../../utils/formatters';
import UserStatusBadge from './UserStatusBadge';
import UserStatusSelect from './UserStatusSelect';

const UserTable: React.FC<UserTableProps> = ({ users, onStatusChange }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            User
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Role
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Joined
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((user) => (
          <tr key={user.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {user.username}
                </div>
                <div className="text-sm text-gray-500">
                  {user.email}
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                {user.role}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <UserStatusBadge status={user.status} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatDate(user.createdAt)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <UserStatusSelect
                value={user.status}
                onChange={(status) => onStatusChange(user.id, status)}
                disabled={user.role === 'admin'}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;