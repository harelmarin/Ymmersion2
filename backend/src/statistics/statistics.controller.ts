import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { UpdateStatisticDto } from './dto/update-statistic.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) { }

  @Patch()
  async updateStatistics(@Body() data: UpdateStatisticDto) {
    return this.statisticsService.updateStatistics(data);
  }

  @Get(':month/:year')
  async getStatisticsByMonth(
    @Param('month', ParseIntPipe) month: number,
    @Param('year', ParseIntPipe) year: number
  ) {
    return this.statisticsService.getStatisticsByMonth(month, year);
  }

  @Get()
  async getAllStatistics() {
    return await this.statisticsService.getAllStatistics();
  }

  @Delete(':id')
  async deleteStatistics(@Param('id', ParseIntPipe) id: number) {
    return await this.statisticsService.deleteStatistics(id)
  }
}
