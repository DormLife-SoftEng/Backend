import { Injectable } from '@nestjs/common';

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

	async validateUser(username: string, password: string): Promise<any>{
		const userDoc = await this.userServ.find(username);
		const result = await bcrypt.compare(password, userDoc.hashedPassword);
		if (result) {
			return userDoc;
		}
		else {
			return null;
		}

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
