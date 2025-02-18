import { IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateRoleDto {
  @IsEnum(Role)
  role: Role;
}
