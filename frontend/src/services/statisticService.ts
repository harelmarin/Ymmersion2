import { apiClient } from './api/apiClient';
import { useQuery, useMutation } from '@tanstack/react-query';
import { StatisticData } from '../types/statisticData';



export const StatisticService = {
  getAllStatistics: async (): Promise<StatisticData[]> => {
    return apiClient<StatisticData[]>('/statistics');
  },

  getStatisticsByMonth: async (month: number, year: number): Promise<StatisticData> => {
    return apiClient<StatisticData>(`/statistics/${month}/${year}`)
  },

  updateStatistics: async (id: number, data: StatisticData): Promise<StatisticData> => {
    return apiClient<StatisticData>(`/statistics/${id}`, {
      method: 'PATCH',
      body: data
    })
  },
}

export const fetchAllStatistics = () => {
  return useQuery<StatisticData[]>({
    queryKey: ['statistics'],
    queryFn: StatisticService.getAllStatistics,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}

export const fetchStatisticsByMonth = (month: number, year: number) => {
  return useQuery<StatisticData>({
    queryKey: ['statistics', month, year],
    queryFn: () => StatisticService.getStatisticsByMonth(month, year),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export const useUpdateStatistics = () => {
  return useMutation<StatisticData, unknown, { id: number; data: StatisticData }>({
    mutationFn: ({ id, data }) => StatisticService.updateStatistics(id, data),
  });
}