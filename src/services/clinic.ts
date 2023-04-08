import { Clinic } from '../models/clinic';

export const get = async (id: string): Promise<Clinic | null> => {
  return await Clinic.findById(id);
};
