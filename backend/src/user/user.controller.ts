import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  async getAllUser() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  @ApiParam({ name: 'id', example: 1, description: "ID de l'utilisateur" })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur par ID' })
  @ApiParam({ name: 'id', example: 1, description: "ID de l'utilisateur" })
  async UpdateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.userService.UpdateUser(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur par ID' })
  @ApiParam({ name: 'id', example: 1, description: "ID de l'utilisateur" })
  async DeleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.DeleteUser(id);
  }
}
