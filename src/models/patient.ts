import mongoose, { Schema } from 'mongoose';
import { Model } from './model';

export interface Patient extends Model {
  fullname: string;
  document: string;
  picture: string;
}

const schema = new Schema<Patient>({
  fullname: { type: String, required: true },
  document: { type: String, required: true },
  picture: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });

export const Patient = mongoose.model<Patient>('Patient', schema);
