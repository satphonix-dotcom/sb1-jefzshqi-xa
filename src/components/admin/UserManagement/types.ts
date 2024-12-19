import { User, UserStatus } from '../../../types';

export interface UserTableProps {
  users: User[];
  onStatusChange: (userId: string, status: UserStatus) => void;
}

export interface UserFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export interface UserStatusBadgeProps {
  status: UserStatus;
}

export interface UserStatusSelectProps {
  value: UserStatus;
  onChange: (value: UserStatus) => void;
  disabled?: boolean;
}