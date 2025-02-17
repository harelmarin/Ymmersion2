import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@ApiTags('vehicles')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau véhicule' })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Get('count')
  @ApiOperation({ summary: 'Récupérer le nombre de véhicules' })
  getVehicleCount() {
    return this.vehicleService.getVehicleCount();
  }

  @Get('count-new')
  @ApiOperation({ summary: 'Récupérer le nombre de véhicules neufs' })
  getNewVehiclesCount() {
    return this.vehicleService.getNewVehiclesCount();
  }

  @Get('count-used')
  @ApiOperation({ summary: 'Récupérer le nombre de véhicules occasions' })
  getUsedVehiclesCount() {
    return this.vehicleService.getUsedVehiclesCount();
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les véhicules' })
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un véhicule par ID' })
  @ApiParam({ name: 'id', example: 1, description: 'ID du véhicule' })
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un véhicule par ID' })
  @ApiParam({ name: 'id', example: 1, description: 'ID du véhicule' })
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un véhicule par ID' })
  @ApiParam({ name: 'id', example: 1, description: 'ID du véhicule' })
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(+id);
  }
}
