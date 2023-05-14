import { Module } from '@nestjs/common';
import { AppointmentController, ClinicController, DoctorController, SpecialtyController } from './controllers';
import { AppointmentService, ClinicService, DoctorService, SpecialtyService } from './services';

@Module({
  imports: [],
  controllers: [AppointmentController, ClinicController, DoctorController, SpecialtyController],
  providers: [AppointmentService, ClinicService, DoctorService, SpecialtyService],
})
export class AppModule {}
