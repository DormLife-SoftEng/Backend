import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	private matchRole(fromRole:string, toRole:string) {
		return (fromRole === toRole);
	}

  	canActivate(context: ExecutionContext): boolean {
    	const role = this.reflector.get<string>('role', context.getHandler());
    	if (!role) {
      		return true;
    	}
    	const request = context.switchToHttp().getRequest();
    	const user = request.user;
    	return this.matchRole(role, user.role);
  	}
}

