import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Condition } from '../enum/condition.enum';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  @ApiPropertyOptional({ example: 'Honda', description: 'Nouvelle marque' })
  brand?: string;

  @ApiPropertyOptional({ example: 'Civic', description: 'Nouveau modèle' })
  model?: string;

  @ApiPropertyOptional({
    example: 2022,
    description: 'Nouvelle année de fabrication',
  })
  year?: number;

  @ApiPropertyOptional({ example: 50000, description: 'Nouveau kilométrage' })
  mileage?: number;

  @ApiPropertyOptional({ example: 25000.99, description: 'Nouveau prix' })
  price?: number;

  @ApiPropertyOptional({
    example: 'used',
    description: 'Nouvel état du véhicule',
    enum: ['new', 'used', 'damaged'],
  })
  condition?: Condition;

  @ApiPropertyOptional({ example: true, description: 'Nouvelle disponibilité' })
  available?: boolean;

  @ApiPropertyOptional({
    example: 20000.00,
    description: 'Nouveau prix d\'achat',
  })
  purchasePrice?: number;
}
