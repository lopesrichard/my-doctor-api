import { Injectable } from '@nestjs/common';
import { Appointment } from '../entities';
import { AddAppointment, UpdateAppointment } from '../models';

@Injectable()
export class AppointmentService {
  async list(): Promise<Appointment[]> {
    return await Appointment.find({ relations: { clinic: { address: true }, doctor: true, patient: true } });
  }

  async get(id: number): Promise<Appointment | null> {
    return await Appointment.findOne({
      where: { id },
      relations: { clinic: { address: true }, doctor: true, patient: true },
    });
  }

  async getByPatient(id: number): Promise<Appointment[]> {
    return await Appointment.find({
      where: { patient: { id } },
      order: { scheduledTo: -1 },
      relations: { clinic: { address: true }, doctor: true },
    });
  }

  async getByDoctor(id: number): Promise<Appointment[]> {
    return await Appointment.find({
      where: { doctor: { id } },
      order: { scheduledTo: -1 },
      relations: { clinic: { address: true }, doctor: true },
    });
  }

  async insert(data: AddAppointment): Promise<Appointment> {
    const appointment = Appointment.create({
      status: data.status,
      scheduledTo: data.scheduledTo,
      clinic: { id: data.clinic_id },
      doctor: { id: data.doctor_id },
      patient: { id: data.patient_id },
    });
    return await Appointment.save(appointment);
  }

  async update(id: number, data: UpdateAppointment): Promise<Appointment> {
    const appointment = Appointment.create({ id: id, status: data.status });
    return await Appointment.save(appointment);
  }
}
