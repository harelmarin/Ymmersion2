export type StatisticData = {
  id: number;
  month: number;
  year: number;
  totalSales: number;
  totalPurchases: number;
  vehiclesSold: number;
  vehiclesPurchased: number;
  transactionType: 'purchase' | 'sale';
};
