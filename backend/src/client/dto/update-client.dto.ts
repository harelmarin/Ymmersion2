import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsDateString,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateClientProfileDto } from './create-client.dto';

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

export class UpdateClientProfileDto extends PartialType(
  CreateClientProfileDto,
) {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
