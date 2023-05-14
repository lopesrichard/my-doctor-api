import { Injectable } from '@nestjs/common';
import { Specialty } from '../entities';
import { AddSpecialty } from '../models';

@Injectable()
export class SpecialtyService {
  async get(id: number): Promise<Specialty | null> {
    return await Specialty.findOneBy({ id });
  }

  async list(): Promise<Specialty[]> {
    return await Specialty.find();
  }

  async insert(addSpecialty: AddSpecialty): Promise<Specialty> {
    const specialties = await this.populate([addSpecialty]);
    return specialties[0];
  }

  async populate(addSpecialties: AddSpecialty[]): Promise<Specialty[]> {
    const specialties = addSpecialties.map(addSpecialty =>
      Specialty.create({
        code: addSpecialty.code,
        description: addSpecialty.description,
        icon: addSpecialty.icon,
      })
    );
    return await Specialty.save(specialties);
  }
}
