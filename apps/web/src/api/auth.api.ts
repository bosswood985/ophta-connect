import apiClient from './client';
import type { AuthTokens, LoginCredentials, AuthUser } from '@ophta-connect/shared';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<{ user: AuthUser; tokens: AuthTokens }> => {
    const { data } = await apiClient.post('/api/auth/login', credentials);
    return data;
  },

  register: async (userData: any): Promise<{ user: AuthUser; tokens: AuthTokens }> => {
    const { data } = await apiClient.post('/api/auth/register', userData);
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/api/auth/logout');
  },
};
