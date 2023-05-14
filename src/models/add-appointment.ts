import { Type } from 'class-transformer';
import { IsInt, IsDate, IsPositive } from 'class-validator';
import { AppointmentStatus } from '../enums/appointment-status';

export class AddAppointment {
  @IsDate()
  @Type(() => Date)
  scheduledTo: Date;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  clinic_id: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  doctor_id: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  patient_id: number;

  status: AppointmentStatus;
}
