import { Injectable } from '@nestjs/common';
import { Clinic } from '../entities';
import { AddClinic } from '../models';

@Injectable()
export class ClinicService {
  async get(id: number): Promise<Clinic | null> {
    return await Clinic.findOneBy({ id });
  }

  async list(): Promise<Clinic[]> {
    return await Clinic.find({ relations: { address: true } });
  }

  async insert(addClinic: AddClinic): Promise<Clinic> {
    const clinics = await this.populate([addClinic]);
    return clinics[0];
  }

  async populate(addClinics: AddClinic[]): Promise<Clinic[]> {
    const clinics = addClinics.map(addClinic =>
      Clinic.create({
        name: addClinic.name,
        address: addClinic.address,
      })
    );
    return await Clinic.save(clinics);
  }
}
