import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Signin, PatientSignup, DoctorSignup, JwtTokens, JwtPayload } from '../models';
import { Doctor, Patient, User } from '../entities';
import bcrypt from 'bcrypt';
import { Role } from '../enums/role';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async signin(signin: Signin): Promise<JwtTokens> {
    const user = await User.findOneBy({ username: signin.username });

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    var comparison = await bcrypt.compare(signin.password, user.password);

    if (!comparison) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }

    const payload: JwtPayload = { sub: user.id, role: user.role };

    return {
      accessToken: await this.jwt.signAsync(payload),
    };
  }

  async signup(signup: PatientSignup | DoctorSignup): Promise<JwtTokens> {
    const { fullname, username, password, picture } = signup;

    var salt = bcrypt.genSaltSync();
    var hash = await bcrypt.hash(password, salt);

    if ('document' in signup) {
      const { document } = signup;
      const user = User.create({ username, password: hash, role: Role.PATIENT });
      const patient = Patient.create({ fullname, document, picture, user });
      await Patient.save(patient);
    } else {
      const { registrationNumber } = signup;
      const user = User.create({ username, password: hash, role: Role.DOCTOR });
      const doctor = Doctor.create({ fullname, registrationNumber, picture, user });
      await Patient.save(doctor);
    }

    return await this.signin({ username, password });
  }
}
