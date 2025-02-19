import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const { options, ...vehicleData } = createVehicleDto;

    const validFields = {
      brand: vehicleData.brand,
      model: vehicleData.model,
      version: vehicleData.version,
      color: vehicleData.color,
      vin: vehicleData.vin,
      internalId: vehicleData.internalId,
      mileage: Number(vehicleData.mileage),
      licensePlate: vehicleData.licensePlate,
      fees: Number(vehicleData.fees),
      price: Number(vehicleData.price),
      purchasePrice: Number(vehicleData.purchasePrice),
      img: vehicleData.img,
      isRental: vehicleData.isRental,
      condition: vehicleData.condition,
      available: vehicleData.available,
    };

    try {
      const vehicle = await this.prismaService.vehicle.create({
        data: {
          ...validFields,
          options: {
            create: options?.map((name) => ({ name })) || [],
          },
        },
        include: {
          options: true,
        },
      });
      return vehicle;
    } catch (error) {
      console.error('Erreur détaillée:', error);
      if (error.code === 'P2002') {
        throw new Error(
          'Un véhicule avec ce VIN, matricule ou plaque existe déjà',
        );
      }
      throw new Error(
        `Erreur lors de la création du véhicule: ${error.message}`,
      );
    }
  }

  findAll() {
    const vehicles = this.prismaService.vehicle.findMany();

    if (!vehicles) {
      throw new NotFoundException('No vehicles found');
    }

    return vehicles;
  }

  async findOne(id: number) {
    const vehicle = await this.prismaService.vehicle.findUnique({
      where: {
        id: id,
      },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return vehicle;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const { options, ...vehicleData } = updateVehicleDto;

    try {
      console.log('Données reçues:', { id, updateVehicleDto });

      const validFields = {
        brand: vehicleData.brand,
        model: vehicleData.model,
        version: vehicleData.version,
        color: vehicleData.color,
        vin: vehicleData.vin,
        internalId: vehicleData.internalId,
        mileage: vehicleData.mileage ? Number(vehicleData.mileage) : undefined,
        licensePlate: vehicleData.licensePlate,
        fees: vehicleData.fees ? Number(vehicleData.fees) : undefined,
        price: vehicleData.price ? Number(vehicleData.price) : undefined,
        purchasePrice: vehicleData.purchasePrice
          ? Number(vehicleData.purchasePrice)
          : undefined,
        isRental: vehicleData.isRental,
        condition: vehicleData.condition,
        available: vehicleData.available,
      };

      if (options) {
        await this.prismaService.vehicleOption.deleteMany({
          where: { vehicleId: id },
        });

        if (options.length > 0) {
          await this.prismaService.vehicleOption.createMany({
            data: options.map((name) => ({
              name,
              vehicleId: id,
            })),
          });
        }
      }

      const updatedVehicle = await this.prismaService.vehicle.update({
        where: { id },
        data: validFields,
        include: {
          options: true,
        },
      });

      return updatedVehicle;
    } catch (error) {
      console.error('Erreur détaillée lors de la mise à jour:', error);
      if (error.code === 'P2002') {
        throw new Error(
          'Un véhicule avec ce VIN, matricule ou plaque existe déjà',
        );
      }
      throw new Error(
        `Erreur lors de la mise à jour du véhicule: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.vehicleOption.deleteMany({
        where: { vehicleId: id },
      });

      const deletedVehicle = await this.prismaService.vehicle.delete({
        where: { id },
        include: {
          options: true,
        },
      });

      return deletedVehicle;
    } catch (error) {
      console.error('Erreur détaillée:', error);
      throw new Error(
        `Erreur lors de la suppression du véhicule: ${error.message}`,
      );
    }
  }

  async getVehicleCount() {
    try {
      const count = await this.prismaService.vehicle.count();
      return count;
    } catch (error) {
      console.error('Error counting vehicles:', error);
      throw error;
    }
  }

  async getNewVehiclesCount() {
    try {
      const newVehicles = await this.prismaService.vehicle.count({
        where: {
          condition: 'new',
        },
      });
      return newVehicles;
    } catch (error) {
      console.error('Error fetching new vehicles:', error);
      throw error;
    }
  }

  async getUsedVehiclesCount() {
    try {
      const usedVehicles = await this.prismaService.vehicle.count({
        where: {
          condition: 'used',
        },
      });
      return usedVehicles;
    } catch (error) {
      console.error('Error fetching used vehicles:', error);
      throw error;
    }
  }

  async getLastAddedVehicles() {
    try {
      const vehicles = await this.prismaService.vehicle.findMany({
        take: 3,
        orderBy: {
          addedAt: 'desc',
        },
      });
      return vehicles;
    } catch (error) {
      console.error('Error fetching last added vehicles:', error);
      throw error;
    }
  }

  async getAllVehicleOptions() {
    try {
      const options = await this.prismaService.vehicleOption.findMany();
      return options;
    } catch (error) {
      console.error('Error fetching all vehicle options:', error);
      throw error;
    }
  }

  async getVehicleOptions(id: number) {
    try {
      const vehicle = await this.prismaService.vehicle.findUnique({
        where: { id },
        include: {
          options: true,
        },
      });

      return vehicle.options;
    } catch (error) {
      console.error('Error fetching vehicle options:', error);
      throw error;
    }
  }
}
