import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Statistic } from './entities/statistic.entity';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) { }

  async updateStatistics(transaction: UpdateStatisticDto) {
    const { transactionType, amount, transactionDate } = transaction;

    let date: Date;

    if (typeof transactionDate === 'string') {
      date = new Date(transactionDate);
    } else {
      date = transactionDate;
    }

    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const existingStats = await this.prisma.statistics.findFirst({
      where: { month, year },
    });

    if (existingStats) {
      await this.prisma.statistics.update({
        where: { id: existingStats.id },
        data: {
          totalSales:
            transactionType === 'sale' ? { increment: amount } : undefined,
          totalPurchases:
            transactionType === 'purchase' ? { increment: amount } : undefined,
          vehiclesSold: transactionType === 'sale' ? { increment: 1 } : undefined,
          vehiclesPurchased:
            transactionType === 'purchase' ? { increment: 1 } : undefined,
        },
      });
    } else {
      await this.prisma.statistics.create({
        data: {
          month,
          year,
          totalSales: transactionType === 'sale' ? amount : 0,
          totalPurchases: transactionType === 'purchase' ? amount : 0,
          vehiclesSold: transactionType === 'sale' ? 1 : 0,
          vehiclesPurchased: transactionType === 'purchase' ? 1 : 0,
        },
      });
    }
  }

  async getStatisticsByMonth(month: number, year: number): Promise<Statistic> {
    const statistic = await this.prisma.statistics.findFirst({
      where: { month, year },
    });

    if (!statistic) {
      throw new NotFoundException(
        `Statistics for month ${month} and year ${year} not found`
      );
    }

    return {
      ...statistic,
      totalSales: parseFloat(statistic.totalSales.toString()),
      totalPurchases: parseFloat(statistic.totalPurchases.toString()),
      vehiclesSold: statistic.vehiclesSold,
      vehiclesPurchased: statistic.vehiclesPurchased,
    };
  }

  async getAllStatistics(): Promise<Statistic[]> {
    const statistics = await this.prisma.statistics.findMany();

    if (statistics.length === 0) {
      throw new NotFoundException('No statistics found');
    }

    return statistics.map(statistic => ({
      ...statistic,
      totalSales: parseFloat(statistic.totalSales.toString()),
      totalPurchases: parseFloat(statistic.totalPurchases.toString()),
      vehiclesSold: statistic.vehiclesSold,
      vehiclesPurchased: statistic.vehiclesPurchased,
    }));
  }

  async deleteStatistics(id: number): Promise<Statistic> {
    const deletedStatistic = await this.prisma.statistics.delete({
      where: { id: id }
    });

    return {
      ...deletedStatistic,
      totalSales: parseFloat(deletedStatistic.totalSales.toString()),
      totalPurchases: parseFloat(deletedStatistic.totalPurchases.toString()),
      vehiclesSold: deletedStatistic.vehiclesSold,
      vehiclesPurchased: deletedStatistic.vehiclesPurchased,
    };
  }

}
