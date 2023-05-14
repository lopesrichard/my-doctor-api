import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from './appointment';

@Entity()
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  document: string;

  @Column()
  picture: string;

  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointments: Appointment[];
}
