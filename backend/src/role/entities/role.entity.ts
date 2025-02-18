import { ApiProperty } from '@nestjs/swagger';
import { Role as RoleEnum } from '@prisma/client';

export class Role {
  @ApiProperty({ example: 'employee', description: 'Nom du rôle' })
  name: RoleEnum;
}
