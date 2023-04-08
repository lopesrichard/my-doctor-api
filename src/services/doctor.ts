import { FilterQuery } from 'mongoose';
import { Doctor } from '../models/doctor';

export const get = async (id: string): Promise<Doctor | null> => {
  return await Doctor.findById(id);
};

export const list = async (specialty: string): Promise<Doctor[]> => {
  const query: FilterQuery<Doctor> = {};

  if (specialty) {
    query.specialties = specialty;
  }

  return await Doctor.find(query);
};

export const insert = async (specialty: Doctor): Promise<Doctor> => {
  return await Doctor.create(specialty);
};

export const populate = async (specialties: Doctor[]): Promise<Doctor[]> => {
  return await Doctor.insertMany(specialties);
};
