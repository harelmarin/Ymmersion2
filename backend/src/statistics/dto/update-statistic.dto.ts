import { IsInt, IsOptional, IsPositive, IsEnum, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatisticDto {
  @ApiProperty({ example: 2, description: 'Mois à mettre à jour (1-12)', required: false })
  @IsOptional()
  @IsInt()
  month?: number;

  @ApiProperty({ example: 2025, description: 'Année à mettre à jour', required: false })
  @IsOptional()
  @IsInt()
  year?: number;

  @ApiProperty({ example: 10000, description: 'Total des ventes', required: false })
  @IsOptional()
  @IsPositive()
  totalSales?: number;

  @ApiProperty({ example: 5000, description: 'Total des achats', required: false })
  @IsOptional()
  @IsPositive()
  totalPurchases?: number;

  @ApiProperty({ example: 3, description: 'Nombre de véhicules vendus', required: false })
  @IsOptional()
  @IsInt()
  vehiclesSold?: number;

  @ApiProperty({ example: 2, description: 'Nombre de véhicules achetés', required: false })
  @IsOptional()
  @IsInt()
  vehiclesPurchased?: number;

  @ApiProperty({ example: 'sale', description: 'Type de transaction', enum: ['purchase', 'sale'] })
  @IsEnum(['purchase', 'sale'])
  transactionType: string;

  @ApiProperty({ example: 15000, description: 'Montant de la transaction' })
  @IsPositive()
  amount: number;

  @ApiProperty({ example: '2025-02-18T12:00:00.000Z', description: 'Date de la transaction' })
  @IsDate()
  transactionDate: Date;
}
