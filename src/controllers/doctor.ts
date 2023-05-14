import { Request, Response } from 'express';
import * as Service from '../services/doctor';

export const get = async (req: Request, res: Response) => {
  const doctor = await Service.get(parseInt(req.params.id));
  res.json(doctor);
};

export const list = async (req: Request, res: Response) => {
  const specialty = req.query.specialty as string;
  const doctors = await Service.list(specialty);
  res.json(doctors);
};
