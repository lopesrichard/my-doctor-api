import { AddAppointment, UpdateAppointment } from '../models';
import { AppointmentStatus, Role } from '../enums';
import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppointmentService, PatientService } from '../services';
import { Roles } from '../guards/metadata';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly patientService: PatientService
  ) {}

  @Roles([Role.ADMIN])
  @Get()
  async list() {
    return await this.appointmentService.list();
  }

  @Roles([Role.DOCTOR, Role.PATIENT])
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.appointmentService.get(id);
  }

  @Roles([Role.PATIENT])
  @Post()
  async insert(@Body() data: AddAppointment, @Req() request: Request) {
    var patient = await this.patientService.getByUser(request.user.id);
    data.status = AppointmentStatus.OPEN;
    data.patient_id = patient.id;
    return await this.appointmentService.insert(data);
  }

  @Roles([Role.DOCTOR, Role.PATIENT])
  @Delete(':id')
  async cancel(@Param('id') id: number) {
    const data: UpdateAppointment = { status: AppointmentStatus.CANCELED };
    return await this.appointmentService.update(id, data);
  }
}
