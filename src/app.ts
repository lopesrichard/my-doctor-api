import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { db } from './data-source';

import * as SpecialtyController from './controllers/specialty';
import * as DoctorController from './controllers/doctor';
import * as AppointmentController from './controllers/appointment';
import * as ClinicController from './controllers/clinic';

async function main() {
  dotenv.config();
  db.config();

  await db.connect();
  const app = express();

  app.use(express.json());
  app.use(cors({ origin: '*' }));

  app.get('/specialties', SpecialtyController.list);
  app.get('/doctors', DoctorController.list);
  app.get('/doctors/:id', DoctorController.get);
  app.get('/doctors/:id/appointments', AppointmentController.getByDoctor);
  app.get('/patients/:id/appointments', AppointmentController.getByPatient);
  app.post('/appointments', AppointmentController.insert);
  app.delete('/appointments/:id', AppointmentController.cancel);
  app.get('/clinics', ClinicController.list);
  app.get('/clinics/:id', ClinicController.get);

  app.listen(3000);
}

main().catch(err => console.log(err));
