import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY, ROLES_KEY } from './metadata';
import { Role } from '../enums/role';
import { JwtPayload } from '../models';
import { User } from '../entities';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly service: JwtService, private readonly reflector: Reflector) {}

  getMetadata<T>(context: ExecutionContext, key: string) {
    return this.reflector.getAllAndOverride<T>(key, [context.getHandler(), context.getClass()]);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const isPublic = this.getMetadata<boolean>(context, IS_PUBLIC_KEY);

    if (isPublic) {
      return true;
    }

    const user = await this.authenticate(request);

    request.user = user;

    return await this.authorize(context, user);
  }

  private async authenticate(request: Request) {
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      await this.service.verifyAsync(token, { secret: process.env.JWT_SECRET! });
    } catch {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = this.service.decode(token) as JwtPayload;

    const user = await User.findOneBy({ id: payload.sub });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private async authorize(context: ExecutionContext, user: User) {
    if (user.role === Role.ADMIN) {
      return true;
    }

    const roles = this.getMetadata<Role>(context, ROLES_KEY);

    if (!roles) {
      return true;
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
