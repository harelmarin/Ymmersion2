import { IsString, IsOptional, IsEnum, IsEmail, IsDateString } from 'class-validator';

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

export class CreateClientProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

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
