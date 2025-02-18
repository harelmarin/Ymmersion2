import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // Retourne tous les rôles définis dans l'enum
  @Get()
  findAll() {
    return this.roleService.getAllRoles();
  }

  // Retourne un rôle spécifique
  @Get(':roleName')
  findOne(@Param('roleName') roleName: string) {
    try {
      return this.roleService.getRoleByName(roleName);
    } catch (error) {
      throw new NotFoundException(`Role "${roleName}" not found`);
    }
  }
}
