import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getAllUser() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Patch(':id')
  async UpdateUser(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
    return await this.userService.UpdateUser(id, data)
  }

  @Delete(':id')
  async DeleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.DeleteUser(id)
  }



}
