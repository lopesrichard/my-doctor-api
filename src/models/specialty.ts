import mongoose, { Schema } from 'mongoose';
import { Model } from './model';

export interface Specialty extends Model {
  code: string;
  description: string;
  icon: string;
}

const schema = new Schema<Specialty>({
  code: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });

export const Specialty = mongoose.model<Specialty>('Specialty', schema);
