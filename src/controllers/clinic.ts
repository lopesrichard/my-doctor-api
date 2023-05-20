import { Controller, Get, Param } from '@nestjs/common';
import { ClinicService } from '../services/clinic';
import { Roles } from '../guards/metadata';
import { Role } from '../enums/role';

@Controller('clinics')
export class ClinicController {
  constructor(private readonly service: ClinicService) {}

  @Roles([Role.DOCTOR, Role.PATIENT])
  @Get()
  async list() {
    return await this.service.list();
  }

  @Roles([Role.DOCTOR, Role.PATIENT])
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.service.get(id);
  }
}
