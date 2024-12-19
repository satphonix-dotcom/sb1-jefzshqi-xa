export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  isVerified: boolean;
  createdAt: string;
}

export type UserRole = 'admin' | 'vendor' | 'customer';

export type UserStatus = 'active' | 'suspended' | 'banned';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface FormErrors {
  form?: string;
  [key: string]: string | undefined;
}