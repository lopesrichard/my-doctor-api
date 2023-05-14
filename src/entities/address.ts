import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  addressLine: string;

  @Column({ nullable: false })
  latitude: number;

  @Column({ nullable: false })
  longitude: number;
}
