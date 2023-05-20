import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role';

export const IS_PUBLIC_KEY = 'IS_PUBLIC_KEY';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'ROLES_KEY';
export const Roles = (roles: Role[]) => SetMetadata(ROLES_KEY, roles);
