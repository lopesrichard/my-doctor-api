import mongoose, { Schema } from 'mongoose';
import { Model } from './model';

export interface Address extends Model {
  addressLine: string;
  latitude: number;
  longitude: number;
}

export const schema = new Schema<Address>({
  addressLine: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

schema.set('toJSON', { virtuals: true });

export const Address = mongoose.model<Address>('Address', schema);
