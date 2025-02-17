import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto) {
    try {
      const vehicle = await this.prismaService.vehicle.create({
        data: createVehicleDto,
      });

      return vehicle;
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    const vehicles = this.prismaService.vehicle.findMany();

    if (!vehicles) {
      throw new NotFoundException('No vehicles found');
    }

    return vehicles;
  }

  findOne(id: number) {
    const vehicle = this.prismaService.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return vehicle;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    try {
      const updatedVehicle = this.prismaService.vehicle.update({
        where: { id },
        data: updateVehicleDto,
      });

      return updatedVehicle;
    } catch (error) {
      throw new Error(error);
    }
  }

  remove(id: number) {
    try {
      const deletedVehicle = this.prismaService.vehicle.delete({
        where: { id },
      });

      return deletedVehicle;
    } catch (error) {
      throw new Error(error);
    }
  }
}
