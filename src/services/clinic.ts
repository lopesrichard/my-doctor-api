import { AddClinic, Clinic } from '../entities/clinic';

export const get = async (id: number): Promise<Clinic | null> => {
  return await Clinic.findOneBy({ id });
};

export const list = async (): Promise<Clinic[]> => {
  return await Clinic.find({ relations: { address: true } });
};

export const insert = async (addClinic: AddClinic): Promise<Clinic> => {
  const clinics = await populate([addClinic]);
  return clinics[0];
};

export const populate = async (addClinics: AddClinic[]): Promise<Clinic[]> => {
  const clinics = addClinics.map(addClinic =>
    Clinic.create({
      name: addClinic.name,
      address: addClinic.address,
    })
  );
  return await Clinic.save(clinics);
};
