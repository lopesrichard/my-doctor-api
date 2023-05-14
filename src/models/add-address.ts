import { IsLatitude, IsLongitude, IsNotEmpty, IsString } from 'class-validator';

export class AddAddress {
  @IsString()
  @IsNotEmpty()
  addressLine: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}
