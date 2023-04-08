import { Address } from './address';
import { Model } from './model';
import mongoose, { Schema } from 'mongoose';
import { schema as addressSchema } from './address';

export interface Clinic extends Model {
  name: string;
  address: Address;
}

const schema = new Schema<Clinic>({
  name: { type: String, required: true },
  address: { type: addressSchema, required: true },
});

schema.set('toJSON', { virtuals: true });

export const Clinic = mongoose.model<Clinic>('Clinic', schema);
