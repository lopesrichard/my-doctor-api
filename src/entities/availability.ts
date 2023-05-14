import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DayOfWeek } from '../enums/day-of-week';
import { Doctor } from './doctor';

@Entity()
export class Availability extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { enum: DayOfWeek, nullable: false })
  dayOfWeek: DayOfWeek;

  @Column('time', { nullable: false })
  startTime: string;

  @Column('time', { nullable: false })
  endTime: string;

  @ManyToOne(() => Doctor, doctor => doctor.availability, { nullable: false })
  doctor: Doctor;
}
