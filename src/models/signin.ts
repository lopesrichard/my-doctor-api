import { IsNotEmpty, IsString } from 'class-validator';

export class Signin {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
