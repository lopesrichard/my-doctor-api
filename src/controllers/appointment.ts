import { Request, Response } from 'express';
import * as Service from '../services/appointment';
import { Appointment } from '../models/appointment';
import { AppointmentStatus } from '../models/appointment-status';
import { ObjectId } from 'mongodb';

export const getByDoctor = async (req: Request, res: Response) => {
  const doctor = await Service.getByDoctor(req.params.id);
  res.json(doctor);
};

export const getByPatient = async (req: Request, res: Response) => {
  const doctor = await Service.getByPatient(req.params.id);
  res.json(doctor);
};

export const insert = async (req: Request, res: Response) => {
  const data: Appointment = {
    status: AppointmentStatus.OPEN,
    scheduledTo: new Date(req.body.scheduledTo),
    clinic_id: new ObjectId(req.body.clinic_id),
    doctor_id: new ObjectId(req.body.doctor_id),
    patient_id: new ObjectId(req.body.patient_id),
  };

  const appointment = await Service.insert(data);

  res.json(appointment);
};

export const cancel = async (req: Request, res: Response) => {
  const appointment = await Service.update(req.params.id, { status: AppointmentStatus.CANCELED });
  res.json(appointment);
};
