import mongoose, { Schema } from 'mongoose';
import { Availability } from './availability';
import { schema as availabilitySchema } from './availability';
import { Model } from './model';
import { ObjectId } from 'mongodb';

export interface Doctor extends Model {
  fullname: string;
  registrationNumber: string;
  picture: string;
  rating: number;
  clinic_id: ObjectId;
  availability: Availability[];
  specialties: string[];
}

const schema = new Schema<Doctor>({
  fullname: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  picture: { type: String, required: true },
  rating: { type: Number, required: true },
  clinic_id: { type: ObjectId, required: true },
  availability: { type: [availabilitySchema], required: true },
  specialties: { type: [String], required: true },
});

schema.set('toJSON', { virtuals: true });

export const Doctor = mongoose.model<Doctor>('Doctor', schema);
