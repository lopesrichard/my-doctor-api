import { Controller, Get, Param } from '@nestjs/common';
import { PatientService, AppointmentService } from '../services';

@Controller('patients')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
    private readonly appointmentService: AppointmentService
  ) {}

  @Get()
  async list() {
    return await this.patientService.list();
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.patientService.get(id);
  }

  @Get(':id/appointments')
  async appointments(@Param('id') id: number) {
    return await this.appointmentService.getByPatient(id);
  }
}
