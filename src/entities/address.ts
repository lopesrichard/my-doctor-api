import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  addressLine: string;

  @Column('decimal', { precision: 10, scale: 8, nullable: false })
  latitude: number;

  @Column('decimal', { precision: 11, scale: 8, nullable: false })
  longitude: number;
}
