import { Injectable } from '@nestjs/common';

import { UserDocument } from 'src/users/schemas/users.schemas';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload, jwtToken } from './auth.interface';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';


var bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
	constructor(
		private userServ: UsersService,
		private jwtServ: JwtService,
	) {}

	async validateUser(username: string, password: string): Promise<any>{
		const userDoc = await this.userServ.find(username);
		if (!userDoc) {
			return null;
		}
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
			token_type: 'Bearer'
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

	async checkValidToken(refreshToken: string): Promise<any> {
		const decodedPayload: any = this.jwtServ.decode(refreshToken)
		const userDoc: UserDocument = await this.userServ.findById(decodedPayload.userId);
		// revoke ?
		if (userDoc.refreshToken != refreshToken) {
			return null;
		}
		// return payload
		return decodedPayload;
	}

	async invalidateToken(userId): Promise<any>{
		const userDoc: UserDocument = await this.userServ.findById(userId);
		if (!userDoc) {
			return null;
		}
		userDoc.refreshToken = null;
		userDoc.save();
		return true;
	}

	async regenerateToken(refresh): Promise<jwtToken | undefined> {
		// regenerate access token
		const options = {secret: jwtConstants.refreshSecret};
		if (await this.jwtServ.verify(refresh.refresh_token, options)) {
			// If valid
			const oldSingedPayload: any = this.checkValidToken(
				refresh.refresh_token
			);
			if (!oldSingedPayload) {
				return null;
			}
			const newUnsignedPayload: jwtPayload = {
				userId: oldSingedPayload.userId,
				name: {
					firstName: oldSingedPayload.name.firstName,
					lastName: oldSingedPayload.name.lastName,
				},
				avatar: oldSingedPayload.avatar,
				role: oldSingedPayload.role,
				token_type: 'Bearer'
			}
			return {
				access_token: this.jwtServ.sign(newUnsignedPayload),
				refresh_token: oldSingedPayload,
			}
		}
		else {
			return null;
		}
	}

}
