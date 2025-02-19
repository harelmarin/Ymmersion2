import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Condition } from '../enum/condition.enum';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  @ApiPropertyOptional({ example: 'Toyota' })
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiPropertyOptional({ example: 'Corolla' })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiPropertyOptional({ example: 'Hybrid 122h' })
  @IsString()
  @IsOptional()
  version?: string;

  @ApiPropertyOptional({ example: 'Noir Métallisé' })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({ example: 'JTDDH3FH503006789' })
  @IsString()
  @IsOptional()
  vin?: string;

  @ApiPropertyOptional({ example: 'ABC123' })
  @IsString()
  @IsOptional()
  internalId?: string;

  @ApiPropertyOptional({ example: 50000 })
  @IsNumber()
  @IsOptional()
  mileage?: number;

  @ApiPropertyOptional({ example: 'AA-123-BB' })
  @IsString()
  @IsOptional()
  licensePlate?: string;

  @ApiPropertyOptional({ example: 1500 })
  @IsNumber()
  @IsOptional()
  fees?: number;

  @ApiPropertyOptional({ example: 25000 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isRental?: boolean;

  @ApiPropertyOptional({ example: ['GPS', 'Toit ouvrant'] })
  @IsString({ each: true })
  @IsOptional()
  options?: string[];

  @ApiPropertyOptional({ example: 'used', enum: Condition })
  @IsEnum(Condition)
  @IsOptional()
  condition?: Condition;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  available?: boolean;
}
