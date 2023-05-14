import { FindManyOptions } from 'typeorm';
import { AddDoctor, Doctor } from '../entities/doctor';

export const get = async (id: number): Promise<Doctor | null> => {
  return await Doctor.findOne({
    where: { id },
    relations: { availability: true, clinics: true },
  });
};

export const list = async (specialty: string): Promise<Doctor[]> => {
  const query: FindManyOptions<Doctor> = {};

  if (specialty) {
    query.where = { specialties: { code: specialty } };
  }

  return await Doctor.find(query);
};

export const insert = async (addDoctor: AddDoctor): Promise<Doctor> => {
  const doctors = await populate([addDoctor]);
  return doctors[0];
};

export const populate = async (addDoctors: AddDoctor[]): Promise<Doctor[]> => {
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
};
