import { Appointment } from '../models/appointment';

export const getByPatient = async (id: string): Promise<Appointment[]> => {
  return await Appointment.find({ patient_id: id }).sort({ scheduledTo: -1 });
};

export const getByDoctor = async (id: string): Promise<Appointment[]> => {
  return await Appointment.find({ doctor_id: id }).sort({ scheduledTo: -1 });
};

export const insert = async (appointment: Appointment): Promise<Appointment> => {
  return await Appointment.create(appointment);
};

export const update = async (id: string, appointment: Partial<Appointment>): Promise<Appointment | null> => {
  return await Appointment.findByIdAndUpdate(id, appointment);
};
