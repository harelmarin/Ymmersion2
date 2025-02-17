import { Prisma, TransactionType } from '@prisma/client';

export class Transaction {
  id: number;
  userId: number;
  vehicleId: number;
  employeeId: number;
  transactionType: TransactionType;
  amount: Prisma.Decimal;
  transactionDate: Date;

}
