import { Controller, Get, Param } from '@nestjs/common';
import { ClinicService } from '../services/clinic';

@Controller('clinics')
export class ClinicController {
  constructor(private readonly service: ClinicService) {}

  @Get()
  async list() {
    return await this.service.list();
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.service.get(id);
  }
}
