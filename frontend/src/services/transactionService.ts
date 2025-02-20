import { apiClient } from './api/apiClient';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Transaction } from '../types/transactionData';
import { createTransaction } from '../types/createTransactionData';

export const TransactionService = {
  getTransactionsByUserId: async (userId: string): Promise<Transaction[]> => {
    return apiClient<Transaction[]>(`/transaction/user/${userId}`);
  },

  getAllTransaction: async (): Promise<Transaction[]> => {
    return apiClient<Transaction[]>('/transaction');
  },

  getTransactionById: async (userId: string): Promise<Transaction[]> => {
    const numericId = parseInt(userId, 10);
    return apiClient<Transaction[]>(`/transaction/user/${numericId}`);
  },

  getTransactionDetails: async (id: string): Promise<Transaction> => {
    const numericId = parseInt(id, 10);
    return apiClient<Transaction>(`/transaction/${numericId}/details`);
  },

  createTransaction: async (
    data: createTransaction,
  ): Promise<createTransaction> => {
    return apiClient<createTransaction>('/transaction', {
      method: 'POST',
      body: data,
    });
  },
};

export const postTransaction = () => {
  return useMutation<createTransaction, Error, createTransaction>({
    mutationFn: (data: createTransaction) =>
      TransactionService.createTransaction({
        ...data,
      }),
  });
};

export const fetchTransactionById = (id: string) => {
  return useQuery<Transaction[]>({
    queryKey: ['userTransactions', id],
    queryFn: () => TransactionService.getTransactionById(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};

export const fetchAllTransaction = () => {
  return useQuery<Transaction[]>({
    queryKey: ['transaction'],
    queryFn: TransactionService.getAllTransaction,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const fetchTransactionDetails = (id: string) => {
  return useQuery<Transaction>({
    queryKey: ['transaction', id],
    queryFn: () => TransactionService.getTransactionDetails(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};
