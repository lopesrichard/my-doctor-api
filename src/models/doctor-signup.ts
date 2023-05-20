import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class DoctorSignup {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @IsUrl()
  picture: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
