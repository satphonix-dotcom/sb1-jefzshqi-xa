import { USER_ROLES } from '../constants';

export const requireAuth = (store) => (next) => (action) => {
  const state = store.getState();
  if (!state.auth.isAuthenticated) {
    throw new Error('Authentication required');
  }
  return next(action);
};

export const requireRole = (roles) => (store) => (next) => (action) => {
  const state = store.getState();
  const userRole = state.auth.user?.role;
  
  if (!roles.includes(userRole)) {
    throw new Error('Insufficient permissions');
  }
  return next(action);
};

export const adminOnly = requireRole([USER_ROLES.ADMIN]);
export const vendorOnly = requireRole([USER_ROLES.VENDOR, USER_ROLES.ADMIN]);