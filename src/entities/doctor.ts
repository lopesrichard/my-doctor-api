import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Availability } from './availability';
import { Specialty } from './specialty';
import { Appointment } from './appointment';
import { Clinic } from './clinic';
import { User } from './user';

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

  @OneToOne(() => User, { nullable: false, cascade: true })
  @JoinColumn()
  user: User;

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
