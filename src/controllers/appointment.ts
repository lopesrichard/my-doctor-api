import { AddAppointment, UpdateAppointment } from '../models';
import { AppointmentStatus } from '../enums/appointment-status';

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppointmentService } from '../services/appointment';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly service: AppointmentService) {}

  // @Get('doctors/:id/appointments')
  // async getByDoctor(@Param('id') id: number) {
  //   return await this.service.getByDoctor(id);
  // }

  // @Get('patients/:id/appointments')
  // async getByPatient(@Param('id') id: number) {
  //   return await this.service.getByPatient(id);
  // }

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

  @Put(':id/cancel')
  async cancel(@Param('id') id: number) {
    const data: UpdateAppointment = { status: AppointmentStatus.CANCELED };
    return await this.service.update(id, data);
  }
}
