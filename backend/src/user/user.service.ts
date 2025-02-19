import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async getAllUsers(): Promise<User[] | null> {
    const users = await this.prisma.user.findMany({
      where: {
        deleted: false
      }
    });

    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id
        }
      });
      return user

    } catch (error) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }

  async updateProfilePic(id: number, profilePic: string) {
    return this.prisma.user.update({
      where: { id: id },
      data: { profile_pic: profilePic },
    });
  }

  async UpdateUser(id: number, data: UpdateUserDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: {
          id: id
        },
        data: {
          ...data
        }
      })
    } catch (error) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }

  async DeleteUser(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.prisma.user.update({
      where: { id },
      data: {
        deleted: true,
        password: null,
        phone: null,
        address: null,
      }
    });
  }

}  
