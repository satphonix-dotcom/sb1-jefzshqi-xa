export type UserRole = 'admin' | 'vendor' | 'customer';
export type UserStatus = 'active' | 'suspended' | 'banned';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  isVerified: boolean;
  createdAt: string;
}

export interface UserFilters {
  role?: UserRole;
  status?: UserStatus;
  search?: string;
}