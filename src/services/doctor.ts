import { BadRequestException, Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { Doctor } from '../entities';
import { AddDoctor } from '../models';

@Injectable()
export class DoctorService {
  async get(id: number): Promise<Doctor | null> {
    return await Doctor.findOne({
      where: { id },
      relations: { availability: true, clinics: true },
    });
  }

  async getByUser(userId: number): Promise<Doctor> {
    const doctor = await Doctor.findOneBy({ user: { id: userId } });
    if (!doctor) throw new BadRequestException('Usuário não é um médico');
    return doctor;
  }

  async list(specialty: string): Promise<Doctor[]> {
    const query: FindManyOptions<Doctor> = {};

    if (specialty) {
      query.where = { specialties: { code: specialty } };
    }

    return await Doctor.find(query);
  }

  async insert(addDoctor: AddDoctor): Promise<Doctor> {
    const doctors = await this.populate([addDoctor]);
    return doctors[0];
  }

  async populate(addDoctors: AddDoctor[]): Promise<Doctor[]> {
    const doctors = addDoctors.map(addDoctor =>
      Doctor.create({
        fullname: addDoctor.fullname,
        registrationNumber: addDoctor.registrationNumber,
        picture: addDoctor.picture,
        rating: addDoctor.rating,
        clinics: addDoctor.clinics.map(id => ({ id })),
        specialties: addDoctor.specialties.map(id => ({ id })),
        availability: addDoctor.availability,
      })
    );
    return await Doctor.save(doctors);
  }
}
