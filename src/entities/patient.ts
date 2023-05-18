import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from './appointment';
import { User } from './user';

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

  @OneToOne(() => User, { nullable: false, cascade: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointments: Appointment[];
}
