import { Injectable } from '@nestjs/common';

import {UserDocument} from 'src/users/schemas/users.schemas';
import {JwtService} from '@nestjs/jwt';
import {jwtPayload, jwtToken} from './auth.interface';
import {UsersService} from '../users/users.service';
import {jwtConstants} from './constants';


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

	async login(user: UserDocument): Promise<jwtToken>{
		const payload: jwtPayload = {
			userId: user._id,
			name: {
				firstName: user.name.firstName,
				lastName: user.name.lastName
			},
			avatar: user.PictureProfile,
			role: user.userType,
		};
		const access_options = {secret: jwtConstants.secret, expiresIn: '15m'};
		const access_token: string = this.jwtServ.sign(payload, access_options);
		const refresh_token = await this.getRefreshToken(payload);
		user.refreshToken = refresh_token;
		// save new refresh_token to db
		user.save();
		return {
			access_token: access_token,
			refresh_token: refresh_token
		};
	}

	async getRefreshToken(payload): Promise<string> {
		const options = { secret: jwtConstants.refreshSecret, expiresIn: '30d'};
		return this.jwtServ.sign(payload, options);
	}

	async regerateTokens(refresh): Promise<jwtToken | undefined> {
		// regenerate all tokens
		const options = {secret: jwtConstants.refreshSecret};
		if (await this.jwtServ.verify(refresh.refresh_token, options)) {
			// If valid
			const oldSingedPayload: any = this.jwtServ.decode(
				refresh.refreshToken,
			);
			const newUnsignedPayload: jwtPayload = {
				userId: oldSingedPayload.userId,
				name: {
					firstName: oldSingedPayload.name.firstName,
					lastName: oldSingedPayload.name.lastName,
				},
				avatar: oldSingedPayload.avatar,
				role: oldSingedPayload.role,
			}
			return {
				access_token: this.jwtServ.sign(newUnsignedPayload),
				refresh_token: await this.getRefreshToken(newUnsignedPayload),
			}
		}
		else {
			return null;
		}
	}

}
