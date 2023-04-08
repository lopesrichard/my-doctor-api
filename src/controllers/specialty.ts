import { Request, Response } from 'express';
import * as Service from '../services/specialty';

export const list = async (req: Request, res: Response) => {
  const specialties = await Service.list();
  res.json(specialties);
};
