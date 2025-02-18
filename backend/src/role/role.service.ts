import { Injectable, NotFoundException } from '@nestjs/common';
import { Role as RoleEnum } from '@prisma/client';

@Injectable()
export class RoleService {
  // Retourne tous les rôles définis dans l'enum
  getAllRoles(): string[] {
    return Object.values(RoleEnum);
  }

  // Retourne un rôle spécifique en validant s'il existe dans l'enum
  getRoleByName(roleName: string): RoleEnum {
    const isValidRole = Object.values(RoleEnum).includes(roleName as RoleEnum);
    if (!isValidRole) {
      throw new NotFoundException('Role not found');
    }
    return roleName as RoleEnum;
  }
}
