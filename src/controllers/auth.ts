import { Public } from '../guards/metadata';
import { Signin, PatientSignup, DoctorSignup } from '../models';
import { AuthService } from '../services';

import { Body, Controller, Post } from '@nestjs/common';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('signin')
  async signin(@Body() signin: Signin) {
    return await this.service.signin(signin);
  }

  @Post('signup')
  async signup(@Body() signup: PatientSignup | DoctorSignup) {
    return await this.service.signup(signup);
  }
}
