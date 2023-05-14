import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from './doctor';

@Entity()
export class Specialty extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  icon: string;

  @ManyToMany(() => Doctor, doctor => doctor.specialties)
  doctors: Doctor[];
}
