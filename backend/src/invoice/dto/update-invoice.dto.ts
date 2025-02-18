import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';
import { IsInt, IsString, IsOptional, IsDecimal, IsISO8601 } from 'class-validator';
import { Decimal } from '@prisma/client/runtime/library';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
  @IsInt()
  @IsOptional()
  transactionId?: number;

  @IsString()
  @IsOptional()
  invoiceNumber?: string;

  @IsString()
  @IsOptional()
  details?: string;

  @IsDecimal()
  @IsOptional()
  totalAmount?: Decimal;

  @IsISO8601()
  @IsOptional()
  invoiceDate?: string;
}
