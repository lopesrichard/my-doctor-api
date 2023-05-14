import { AddAvailability } from './add-availability';

export class AddDoctor {
  fullname: string;
  registrationNumber: string;
  picture: string;
  rating: number;
  clinics: number[];
  specialties: number[];
  availability: AddAvailability[];
}
