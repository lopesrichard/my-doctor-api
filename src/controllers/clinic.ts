import { Request, Response } from 'express';
import * as Service from '../services/clinic';

export const get = async (req: Request, res: Response) => {
  const clinic = await Service.get(parseInt(req.params.id));
  res.json(clinic);
};

export const list = async (req: Request, res: Response) => {
  const clinics = await Service.list();
  res.json(clinics);
};
