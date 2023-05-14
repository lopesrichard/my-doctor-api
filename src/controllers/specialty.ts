import { Controller, Get, Param } from '@nestjs/common';
import { SpecialtyService } from '../services/specialty';

@Controller('specialties')
export class SpecialtyController {
  constructor(private readonly service: SpecialtyService) {}

  @Get()
  async list() {
    return await this.service.list();
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.service.get(id);
  }
}
