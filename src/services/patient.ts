import { Injectable } from '@nestjs/common';
import { Patient } from '../entities';
import { AddPatient } from '../models';

@Injectable()
export class PatientService {
  async get(id: number): Promise<Patient | null> {
    return await Patient.findOneBy({ id });
  }

  async list(): Promise<Patient[]> {
    return await Patient.find();
  }

  async insert(addPatient: AddPatient): Promise<Patient> {
    const patients = await this.populate([addPatient]);
    return patients[0];
  }

  async populate(addPatients: AddPatient[]): Promise<Patient[]> {
    const patients = addPatients.map(addPatient =>
      Patient.create({
        fullname: addPatient.fullname,
        document: addPatient.document,
        picture: addPatient.picture,
      })
    );
    return await Patient.save(patients);
  }
}
