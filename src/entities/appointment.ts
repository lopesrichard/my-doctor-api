import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppointmentStatus } from '../enums/appointment-status';
import { Clinic } from './clinic';
import { Doctor } from './doctor';
import { Patient } from './patient';

@Entity()
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { enum: AppointmentStatus, nullable: false })
  status: AppointmentStatus;

  @Column({ nullable: false })
  scheduledTo: Date;

  @ManyToOne(() => Clinic, clinic => clinic.appointments, { nullable: false })
  clinic: Clinic;

  @ManyToOne(() => Doctor, doctor => doctor.appointments, { nullable: false })
  doctor: Doctor;

  @ManyToOne(() => Patient, patient => patient.appointments, { nullable: false })
  patient: Patient;
}
