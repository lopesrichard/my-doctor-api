import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth';
import {
  AuthController,
  AppointmentController,
  ClinicController,
  DoctorController,
  SpecialtyController,
  PatientController,
} from './controllers';
import {
  AuthService,
  AppointmentService,
  ClinicService,
  DoctorService,
  SpecialtyService,
  PatientService,
} from './services';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}

@Module({
  imports: [AuthModule],
  controllers: [AppointmentController, ClinicController, DoctorController, SpecialtyController, PatientController],
  providers: [AppointmentService, ClinicService, DoctorService, SpecialtyService, PatientService],
})
export class AppModule {}
