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
import { AddAddress, Address } from './address';
import { Appointment } from './appointment';
import { Doctor } from './doctor';

@Entity()
export class Clinic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToOne(() => Address, { nullable: false, cascade: true })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Appointment, appointment => appointment.clinic)
  appointments: Appointment[];

  @ManyToMany(() => Doctor, doctor => doctor.clinics)
  @JoinTable()
  doctors: Doctor[];
}

export interface AddClinic {
  name: string;
  address: AddAddress;
}
