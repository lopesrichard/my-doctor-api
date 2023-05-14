import { Request, Response } from 'express';
import { AddAppointment, Appointment, UpdateAppointment } from '../entities/appointment';
import { AppointmentStatus } from '../entities/appointment-status';
import * as Service from '../services/appointment';

export const getByDoctor = async (req: Request, res: Response) => {
  const doctor = await Service.getByDoctor(parseInt(req.params.id));
  res.json(doctor);
};

export const getByPatient = async (req: Request, res: Response) => {
  const doctor = await Service.getByPatient(parseInt(req.params.id));
  res.json(doctor);
};

export const insert = async (req: Request, res: Response) => {
  const data: AddAppointment = {
    status: AppointmentStatus.OPEN,
    scheduledTo: new Date(req.body.scheduledTo),
    clinic_id: req.body.clinic_id,
    doctor_id: req.body.doctor_id,
    patient_id: req.body.patient_id,
  };

  const appointment = await Service.insert(data);

  res.json(appointment);
};

export const cancel = async (req: Request, res: Response) => {
  const data: UpdateAppointment = {
    status: AppointmentStatus.CANCELED,
  };
  const appointment = await Service.update(parseInt(req.params.id), data);
  res.json(appointment);
};
