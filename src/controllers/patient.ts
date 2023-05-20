import { Controller, Get, InternalServerErrorException, Param, Req } from '@nestjs/common';
import { PatientService, AppointmentService } from '../services';
import { Roles } from '../guards/metadata';
import { Role } from '../enums/role';
import { Request } from 'express';

@Controller('patients')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly appointmentService: AppointmentService
  ) {}

  @Roles([Role.ADMIN])
  @Get()
  async list() {
    return await this.patientService.list();
  }

  @Roles([Role.PATIENT])
  @Get('self')
  async self(@Req() request: Request) {
    return await this.patientService.getByUser(request.user.id);
  }

  @Roles([Role.DOCTOR])
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.patientService.get(id);
  }

  @Roles([Role.PATIENT])
  @Get('self/appointments')
  async appointments(@Req() request: Request) {
    var patient = await this.patientService.getByUser(request.user.id);
    return await this.appointmentService.getByPatient(patient.id);
  }
}
