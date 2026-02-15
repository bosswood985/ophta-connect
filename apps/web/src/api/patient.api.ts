import apiClient from './client';

export const patientApi = {
  getAll: async (search?: string) => {
    const { data } = await apiClient.get('/api/patients', { params: { search } });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get(`/api/patients/${id}`);
    return data;
  },

  create: async (patientData: any) => {
    const { data } = await apiClient.post('/api/patients', patientData);
    return data;
  },
};
