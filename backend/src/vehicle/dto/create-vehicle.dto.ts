import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsDecimal,
  IsBoolean,
  IsEnum,
  Min,
  Max,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Condition } from '../enum/condition.enum';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Toyota' })
  @IsString()
  brand: string;

  @ApiProperty({ example: 'Corolla' })
  @IsString()
  model: string;

  @ApiProperty({ example: 'Hybrid 122h' })
  @IsString()
  version: string;

  @ApiProperty({ example: 'Noir Métallisé' })
  @IsString()
  color: string;

  @ApiProperty({ example: 'JTDDH3FH503006789' })
  @IsString()
  vin: string;

  @ApiProperty({ example: 'ABC123' })
  @IsString()
  internalId: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  mileage: number;

  @ApiProperty({ example: 'AA-123-BB' })
  @IsString()
  licensePlate: string;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  fees: number;

  @ApiProperty({ example: 25000 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 23000 })
  @IsNumber()
  purchasePrice: number;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  img: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  isRental: boolean;

  @ApiProperty({ example: ['GPS', 'Toit ouvrant'] })
  @IsString({ each: true })
  @IsOptional()
  options?: string[];

  @ApiProperty({ example: 'used', enum: Condition })
  @IsEnum(Condition)
  condition: Condition;

  @ApiProperty({ example: true })
  @IsBoolean()
  available: boolean;
}
