import { Request, Response } from 'express';
import * as Service from '../services/clinic';

export const get = async (req: Request, res: Response) => {
  const clinic = await Service.get(req.params.id);
  res.json(clinic);
};
