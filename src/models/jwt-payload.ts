import { Role } from '../enums';

export class JwtPayload {
  sub: number;
  role: Role;
}
