import { Schema } from 'mongoose';
import { Model } from './model';

export interface Availability extends Model {
  day_of_week: number;
  start_time: string;
  end_time: string;
}

export const schema = new Schema<Availability>({
  day_of_week: { type: Number, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });
