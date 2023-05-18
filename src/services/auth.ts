import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Signin, Signup, JwtTokens, JwtPayload } from '../models';
import { Patient, User } from '../entities';
import bcrypt from 'bcrypt';

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

    const patient = await Patient.findOneBy({ user: { id: user.id } });

    if (!patient) {
      throw new UnauthorizedException('Usuário não associado a nenhum paciente. Favor contactar o suporte.');
    }

    const payload: JwtPayload = { userId: user.id, patientId: patient.id };

    return {
      accessToken: await this.jwt.signAsync(payload),
    };
  }

  async signup(signup: Signup): Promise<JwtTokens> {
    var salt = bcrypt.genSaltSync();

    var hash = await bcrypt.hash(signup.password, salt);

    const user = User.create({ username: signup.username, password: hash });

    const patient = Patient.create({
      fullname: signup.fullname,
      document: signup.document,
      picture: signup.picture,
      user: user,
    });

    await Patient.save(patient);

    return await this.signin({ username: signup.username, password: signup.password });
  }
}
