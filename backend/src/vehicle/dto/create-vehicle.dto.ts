import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsDecimal,
  IsBoolean,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { Condition } from '../enum/condition.enum';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Toyota', description: 'Marque du véhicule' })
  @IsString()
  brand: string;

  @ApiProperty({ example: 'Corolla', description: 'Modèle du véhicule' })
  @IsString()
  model: string;

  @ApiProperty({ example: 2022, description: 'Année de fabrication' })
  @IsInt()
  @Min(1886)
  @Max(new Date().getFullYear())
  year: number;

  @ApiProperty({ example: 50000, description: 'Kilométrage du véhicule' })
  @IsInt()
  @Min(0)
  mileage: number;

  @ApiProperty({ example: 25000.99, description: 'Prix du véhicule' })
  @IsDecimal()
  price: number;

  @ApiProperty({
    example: 'used',
    enum: Condition,
    description: 'État du véhicule',
  })
  @IsEnum(Condition)
  condition: Condition;

  @ApiProperty({ example: true, description: 'Disponibilité du véhicule' })
  @IsBoolean()
  available: boolean;
}
