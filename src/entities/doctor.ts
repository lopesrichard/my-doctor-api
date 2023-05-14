import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Availability } from './availability';
import { Specialty } from './specialty';
import { Appointment } from './appointment';
import { Clinic } from './clinic';

@Entity()
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  fullname: string;

  @Column({ nullable: false })
  registrationNumber: string;

  @Column({ nullable: false })
  picture: string;

  @Column({ nullable: false })
  rating: number;

  @ManyToMany(() => Clinic, clinic => clinic.doctors)
  clinics: Clinic[];

  @OneToMany(() => Availability, availability => availability.doctor, { cascade: true })
  availability: Availability[];

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];

  @ManyToMany(() => Specialty, specialty => specialty.doctors)
  @JoinTable()
  specialties: Specialty[];
}
