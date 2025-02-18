import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Post()
  async createInvoice(@Body() data: CreateInvoiceDto) {
    return await this.invoiceService.CreateInvoice(data)
  }

  @Patch('id')
  async updateInvoice(@Param('id', ParseIntPipe) id: number, data: UpdateInvoiceDto) {
    return await this.invoiceService.UpdateInvoice(id, data)
  }

  @Delete('id')
  async deleteInvoice(@Param('id', ParseIntPipe) id: number) {
    return await this.invoiceService.DeleteInvoice(id)
  }

  @Get()
  async getAllInvoice() {
    return await this.invoiceService.GetAllInvoice();
  }

  @Get('id')
  async getInvoiceById(@Param('id', ParseIntPipe) id: number) {
    return await this.getInvoiceById(id);
  }


}
