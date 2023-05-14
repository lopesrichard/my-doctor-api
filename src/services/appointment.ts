import { AddAppointment, Appointment, UpdateAppointment } from '../entities/appointment';

export const get = async (id: number): Promise<Appointment | null> => {
  return await Appointment.findOne({ where: { id }, relations: { clinic: true, doctor: true } });
};

export const getByPatient = async (id: number): Promise<Appointment[]> => {
  return await Appointment.find({
    where: { patient: { id } },
    order: { scheduledTo: -1 },
    relations: { clinic: true, doctor: true },
  });
};

export const getByDoctor = async (id: number): Promise<Appointment[]> => {
  return await Appointment.find({
    where: { doctor: { id } },
    order: { scheduledTo: -1 },
    relations: { clinic: true, doctor: true },
  });
};

export const insert = async (data: AddAppointment): Promise<Appointment> => {
  const appointment = Appointment.create({
    status: data.status,
    scheduledTo: data.scheduledTo,
    clinic: { id: data.clinic_id },
    doctor: { id: data.doctor_id },
    patient: { id: data.patient_id },
  });
  return await Appointment.save(appointment);
};

export const update = async (id: number, data: UpdateAppointment): Promise<Appointment> => {
  const appointment = Appointment.create({ id: id, status: data.status });
  return await Appointment.save(appointment);
};
