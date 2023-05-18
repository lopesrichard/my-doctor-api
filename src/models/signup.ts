import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class Signup {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsUrl()
  picture: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
