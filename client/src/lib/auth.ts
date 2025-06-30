// Authentication utilities for client-side
export const getAuthToken = (): string | null => {
  return localStorage.getItem('admin_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('admin_token', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('admin_token');
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};
