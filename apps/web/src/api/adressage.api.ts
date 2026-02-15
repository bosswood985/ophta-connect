import apiClient from './client';

export const adressageApi = {
  getAll: async (params?: any) => {
    const { data } = await apiClient.get('/api/adressages', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get(`/api/adressages/${id}`);
    return data;
  },

  create: async (adressageData: any) => {
    const { data } = await apiClient.post('/api/adressages', adressageData);
    return data;
  },

  updateStatut: async (id: string, statutData: any) => {
    const { data } = await apiClient.patch(`/api/adressages/${id}/statut`, statutData);
    return data;
  },
};
