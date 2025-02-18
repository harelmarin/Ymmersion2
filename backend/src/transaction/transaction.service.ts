import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) { }


  async CreateTransaction(data: CreateTransactionDto): Promise<Transaction> {
    return await this.prisma.transactions.create({
      data: { ...data },
      include: { vehicle: true, employee: true, user: true },

    })
  }

  async GetAllTransaction(): Promise<Transaction[] | null> {
    const transactions = await this.prisma.transactions.findMany()

    if (transactions.length === 0) {
      throw new NotFoundException('No users found');
    }

    return transactions
  }

  async getTransactionById(id: number): Promise<Transaction> {
    const transaction = await this.prisma.transactions.findUnique({
      where: { id },
      include: {
        vehicle: true,
        employee: true,
        invoice: true
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }


  async deleteTransaction(id: number): Promise<Transaction> {
    return await this.prisma.transactions.delete({
      where: { id: id }
    })
  }

  async updateTransaction(id: number, data: UpdateTransactionDto): Promise<Transaction> {
    try {
      return await this.prisma.transactions.update({
        where: { id: id },
        data: { ...data }
      })
    } catch (error) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
  }

}
