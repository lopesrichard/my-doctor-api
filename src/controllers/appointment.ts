import { AddAppointment, UpdateAppointment } from '../models';
import { AppointmentStatus } from '../enums/appointment-status';

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppointmentService } from '../services/appointment';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  @Get()
  async list() {
    return await this.service.list();
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.service.get(id);
  }

  @Post()
  async insert(@Body() data: AddAppointment) {
    data.status = AppointmentStatus.OPEN;
    return await this.service.insert(data);
  }

  @Delete(':id')
  async cancel(@Param('id') id: number) {
    const data: UpdateAppointment = { status: AppointmentStatus.CANCELED };
    return await this.service.update(id, data);
  }
}
