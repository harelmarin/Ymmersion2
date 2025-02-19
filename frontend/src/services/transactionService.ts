import { apiClient } from './api/apiClient';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Transaction } from '../types/transactionData';


export const TransactionService = {
  getTransactionById: async (id: string): Promise<Transaction[]> => {
    return apiClient<Transaction[]>(`/transaction/user/${id}`)
  },

  getAllTransaction: async (): Promise<Transaction[]> => {
    return apiClient<Transaction[]>('/transaction')
  }
}

export const fetchTransactionById = (id: string) => {
  return useQuery<Transaction[]>({
    queryKey: ['transaction'],
    queryFn: () => TransactionService.getTransactionById(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}

export const fetchAllTransaction = () => {
  return useQuery<Transaction[]>({
    queryKey: ['transaction'],
    queryFn: TransactionService.getAllTransaction,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}

