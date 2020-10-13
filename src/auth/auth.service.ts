import { Injectable } from '@nestjs/common';
import {UsersService} from 'src/users/users.service';
import {LoginUserDto} from 'src/users/dto/login-user.dto';
import {UserDocument} from 'src/users/schemas/users.schemas';
import {JwtService} from '@nestjs/jwt';
import {jwtPayload, accessToken} from './auth.interface';


var bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
	constructor(
		private userServ: UsersService,
		private jwtServ: JwtService,
	) {}

	async validateUser(loginDto: LoginUserDto): Promise<UserDocument | undefined>{
		this.userServ.find(loginDto).then(userDoc => {
			if(!userDoc) {
				return null;
			}

			bcrypt.compare(loginDto.password, userDoc.hashedPassword).then((isMatch: boolean) => {
				if (isMatch) {
					return userDoc;
				}
			});
		});
		return null;
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
