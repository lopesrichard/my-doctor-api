import { Controller, Get, Param, Query } from '@nestjs/common';
import { DoctorService, AppointmentService } from '../services';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService, private readonly appointmentService: AppointmentService) {}

  @Get()
  async list(@Query('specialty') specialty: string) {
    return await this.doctorService.list(specialty);
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.doctorService.get(id);
  }

  @Get(':id/appointments')
  async appointments(@Param('id') id: number) {
    return await this.appointmentService.getByDoctor(id);
  }
}
