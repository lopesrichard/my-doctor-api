import { AddSpecialty, Specialty } from '../entities/specialty';

export const get = async (id: number): Promise<Specialty | null> => {
  return await Specialty.findOneBy({ id });
};

export const list = async (): Promise<Specialty[]> => {
  return await Specialty.find();
};

export const insert = async (addSpecialty: AddSpecialty): Promise<Specialty> => {
  const specialties = await populate([addSpecialty]);
  return specialties[0];
};

export const populate = async (addSpecialties: AddSpecialty[]): Promise<Specialty[]> => {
  const specialties = addSpecialties.map(addSpecialty =>
    Specialty.create({
      code: addSpecialty.code,
      description: addSpecialty.description,
      icon: addSpecialty.icon,
    })
  );
  return await Specialty.save(specialties);
};
