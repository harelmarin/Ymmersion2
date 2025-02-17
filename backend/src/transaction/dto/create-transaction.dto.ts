import { IsInt, IsEnum, IsOptional, IsDecimal, IsDate } from 'class-validator';
import { TransactionType } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    example: 1,
    description: "ID de l'utilisateur effectuant la transaction",
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 1,
    description: "ID du véhicule impliqué dans la transaction",
  })
  @IsInt()
  vehicleId: number;

  @ApiProperty({
    example: 1,
    description: "ID de l'employé gérant la transaction",
  })
  @IsInt()
  employeeId: number;

  @ApiProperty({
    example: 'purchase',
    description: "Type de la transaction (achat ou vente)",
    enum: TransactionType,
  })
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @ApiProperty({
    example: 79999.99,
    description: "Montant de la transaction",
  })
  @IsDecimal()
  amount: number;

  @ApiPropertyOptional({
    example: '2025-02-17T15:30:00Z',
    description: "Date de la transaction",
  })
  @IsOptional()
  @IsDate()
  transactionDate?: Date;
}
