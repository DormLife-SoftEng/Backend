import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';

import {LoginUserDto} from 'src/users/dto/login-user.dto';
import {UserDocument} from 'src/users/schemas/users.schemas';
import {JwtService} from '@nestjs/jwt';
import {jwtPayload, accessToken} from './auth.interface';
import {UsersService} from '../users/users.service';


var bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
	constructor(
		private userServ: UsersService,
		private jwtServ: JwtService,
	) {}
	private readonly logger = new Logger(AuthService.name);

	async validateUser(username: string, password: string): Promise<any>{
		const userDoc = await this.userServ.find(username);
		this.logger.log(userDoc);
		const result = await bcrypt.compare(password, userDoc.hashedPassword);
		return result;

	}

	async login(user: UserDocument): Promise<accessToken>{
		const payload: jwtPayload = {
			userId: user._id,
			name: {
				firstName: user.name.firstName,
				lastName: user.name.lastName
			},
			avatar: user.PictureProfile,
			role: user.userType,
		};
		return {
			access_token: this.jwtServ.sign(payload),
		};
	}
}
