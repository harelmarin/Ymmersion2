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

  @Get('last-added')
  @ApiOperation({ summary: 'Récupérer le dernier véhicule ajouté' })
  getLastAddedVehicle() {
    return this.vehicleService.getLastAddedVehicles();
  }

  @Get('vehicle-options')
  @ApiOperation({ summary: 'Récupérer les options de véhicules' })
  getVehicleOptions() {
    return this.vehicleService.getAllVehicleOptions();
  }

  @Get('vehicle-options/:id')
  @ApiOperation({ summary: "Récupérer les options d'un véhicule par ID" })
  @ApiParam({ name: 'id', example: 1, description: 'ID du véhicule' })
  getVehicleOptionsById(@Param('id') id: string) {
    return this.vehicleService.getVehicleOptions(+id);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les véhicules' })
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get('available-vehicles-count')
  @ApiOperation({ summary: 'Récupérer le nombre de véhicules disponibles' })
  getAvailableVehiclesCount() {
    return this.vehicleService.getAvailableVehiclesCount();
  }

  @Get('available-new-vehicles-count')
  @ApiOperation({
    summary: 'Récupérer le nombre de véhicules disponibles neufs',
  })
  getAvailableNewVehiclesCount() {
    return this.vehicleService.getAvailableNewVehiclesCount();
  }

  @Get('available-used-vehicles-count')
  @ApiOperation({
    summary: 'Récupérer le nombre de véhicules disponibles occasions',
  })
  getAvailableUsedVehiclesCount() {
    return this.vehicleService.getAvailableUsedVehiclesCount();
  }

  @Get('sold-vehicles-count')
  @ApiOperation({ summary: 'Récupérer le nombre de véhicules vendus' })
  getSoldVehiclesCount() {
    return this.vehicleService.getSoldVehiclesCount();
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
