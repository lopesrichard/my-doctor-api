import { ObjectId } from 'mongodb';
import { Model } from './model';
import mongoose, { Schema } from 'mongoose';
import { AppointmentStatus } from './appointment-status';

export interface Appointment extends Model {
  status: AppointmentStatus;
  scheduledTo: Date;
  clinic_id: ObjectId;
  doctor_id: ObjectId;
  patient_id: ObjectId;
}

const schema = new Schema<Appointment>({
  status: { type: Number, required: true },
  scheduledTo: { type: Date, required: true },
  clinic_id: { type: ObjectId, required: true },
  doctor_id: { type: ObjectId, required: true },
  patient_id: { type: ObjectId, required: true },
});

schema.set('toJSON', { virtuals: true });

export const Appointment = mongoose.model<Appointment>('Appointment', schema);
