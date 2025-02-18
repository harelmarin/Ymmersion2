import { Decimal } from '@prisma/client/runtime/library';
import { IsInt, IsString, IsDecimal, IsNotEmpty, IsISO8601 } from 'class-validator';

export class CreateInvoiceDto {
  @IsInt()
  transactionId: number;

  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @IsString()
  @IsNotEmpty()
  details: string;

  @IsDecimal()
  totalAmount: Decimal;

  @IsISO8601()
  invoiceDate?: string;
}
