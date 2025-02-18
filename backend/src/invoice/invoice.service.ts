import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) { }

  async GetAllInvoice(): Promise<Invoice[]> {
    const invoices = await this.prisma.invoice.findMany({
      include: { transaction: true }
    })

    if (invoices.length === 0) {
      throw new NotFoundException('No invoices found');
    }
    return invoices
  }

  async GetInvoiceById(id: number): Promise<Invoice> {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: id },
      include: { transaction: true }
    })

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice
  }

  async CreateInvoice(data: CreateInvoiceDto): Promise<Invoice> {
    return await this.prisma.invoice.create({
      data: { ...data }
    })
  }

  async DeleteInvoice(id: number) {
    return this.prisma.invoice.delete({
      where: { id: id }
    })
  }

  async UpdateInvoice(id: number, data: UpdateInvoiceDto): Promise<Invoice> {
    try {
      return this.prisma.invoice.update({
        where: { id: id },
        data: { ...data }
      })
    } catch (error) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
  }
}
