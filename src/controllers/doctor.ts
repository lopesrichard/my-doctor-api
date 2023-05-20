import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { DoctorService, AppointmentService } from '../services';
import { Roles } from '../guards/metadata';
import { Role } from '../enums/role';
import { Request } from 'express';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService, private readonly appointmentService: AppointmentService) {}

  @Roles([Role.DOCTOR, Role.PATIENT])
  @Get()
  async list(@Query('specialty') specialty: string) {
    return await this.doctorService.list(specialty);
  }

  @Roles([Role.DOCTOR])
  @Get('self')
  async self(@Req() request: Request) {
    return await this.doctorService.getByUser(request.user.id);
  }

  @Roles([Role.DOCTOR, Role.PATIENT])
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.doctorService.get(id);
  }

  @Roles([Role.DOCTOR])
  @Get('self/appointments')
  async selfAppointments(@Req() request: Request) {
    var doctor = await this.doctorService.getByUser(request.user.id);
    return await this.appointmentService.getByDoctor(doctor.id);
  }

  @Roles([Role.DOCTOR, Role.PATIENT])
  @Get(':id/appointments')
  async appointments(@Param('id') id: number) {
    return await this.appointmentService.getByDoctor(id);
  }
}
