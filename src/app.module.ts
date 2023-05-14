import { Module } from '@nestjs/common';
import {
  AppointmentController,
  ClinicController,
  DoctorController,
  SpecialtyController,
  PatientController,
} from './controllers';
import { AppointmentService, ClinicService, DoctorService, SpecialtyService, PatientService } from './services';

@Module({
  imports: [],
  controllers: [AppointmentController, ClinicController, DoctorController, SpecialtyController, PatientController],
  providers: [AppointmentService, ClinicService, DoctorService, SpecialtyService, PatientService],
})
export class AppModule {}
