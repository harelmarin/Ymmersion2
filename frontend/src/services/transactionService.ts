import { apiClient } from './api/apiClient';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Transaction } from '../types/transactionData';
import { createTransaction } from '../types/createTransactionData';


export const TransactionService = {
  getTransactionById: async (id: string): Promise<Transaction[]> => {
    return apiClient<Transaction[]>(`/transaction/user/${id}`)
  },

  getAllTransaction: async (): Promise<Transaction[]> => {
    return apiClient<Transaction[]>('/transaction')
  },

  createTransaction: async (data: createTransaction): Promise<createTransaction> => {
    return apiClient<createTransaction>('/transaction', {
      method: 'POST',
      body: data
    })
  }
}

export const postTransaction = () => {
  return useMutation<createTransaction, Error, createTransaction>({
    mutationFn: (data: createTransaction) =>
      TransactionService.createTransaction({
        ...data
      }),
  });
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

