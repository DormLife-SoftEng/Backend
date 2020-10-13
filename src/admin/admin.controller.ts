import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { TicketBodyDto, TicketIdDto } from './admin.validation';

@Controller('/tickets')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getTicketsList(@Query('offset') offset: string, @Query('stop') stop: string) {
    if (!(parseInt(offset) === parseFloat(offset) || offset === undefined)) {
      throw new BadRequestException('offset must be integer.');
    }

    if (!(parseInt(stop) === parseFloat(stop) || stop === undefined)) {
      throw new BadRequestException('stop must be integer.');
    }

    if (offset === undefined) {
      offset = '0';
    }

    if (stop === undefined) {
      stop = '50';
    }
    return this.adminService.getTicketsList(offset, stop);
  }

  @Post()
  async addTicket(@Body() ticketBody: TicketBodyDto) {
    const generatedId = await this.adminService.addTicket(ticketBody);
    return { id: generatedId };
  }

  @Get(':ticketId')
  getSingleTicket(
    @Param() ticketId: TicketIdDto,
    @Query('offset') offset: string,
    @Query('stop') stop: string,
  ) {
    if (!(parseInt(offset) === parseFloat(offset) || offset === undefined)) {
      throw new BadRequestException('offset must be integer.');
    }

    if (!(parseInt(stop) === parseFloat(stop) || stop === undefined)) {
      throw new BadRequestException('stop must be integer.');
    }

    if (offset === undefined) {
      offset = '0';
    }

    if (stop === undefined) {
      stop = '50';
    }
    return this.adminService.getSingleTicket(ticketId);
  }

  @Patch(':ticketId')
  approve() {}

  @Delete(':ticketId')
  deleteTicket() {}
}
