import { Specialty } from '../models/specialty';

export const list = async (): Promise<Specialty[]> => {
  return await Specialty.find();
};

export const insert = async (specialty: Specialty): Promise<Specialty> => {
  return await Specialty.create(specialty);
};

export const populate = async (specialties: Specialty[]): Promise<Specialty[]> => {
  return await Specialty.insertMany(specialties);
};
