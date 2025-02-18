import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { Gender } from '@prisma/client';

export class CreateClientProfileDto {
  @ApiProperty({
    description: 'Prénom du client',
    example: 'Jean',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Nom du client',
    example: 'Dupont',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Date de naissance',
    example: '1990-01-01',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @ApiProperty({
    description: 'Genre',
    enum: Gender,
    required: false,
  })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({
    description: 'Adresse du client',
    example: '123 rue de la Paix, 75000 Paris',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Numéro de téléphone',
    example: '0612345678',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Email du client',
    example: 'jean.dupont@email.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;
}
