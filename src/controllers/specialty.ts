import { Controller, Get, Param } from '@nestjs/common';
import { SpecialtyService } from '../services/specialty';
import { Roles } from '../guards/metadata';
import { Role } from '../enums/role';

@Controller('specialties')
export class SpecialtyController {
  constructor(private readonly service: SpecialtyService) {}

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
