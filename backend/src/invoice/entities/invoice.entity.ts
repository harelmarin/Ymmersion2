import { Decimal } from "@prisma/client/runtime/library";

export class Invoice {
  id: number;
  transactionId: number;
  invoiceNumber: string;
  details: string;
  totalAmount: Decimal;
  invoiceDate: Date;
}
