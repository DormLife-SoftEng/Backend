import {Injectable, UnauthorizedException} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-jwt";
import {AuthService} from "../auth.service";
import {LoginUserDto} from "src/users/dto/login-user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super();
	}

	async validate(loginDto: LoginUserDto): Promise<any> {
		const user = await this.authService.validateUser(loginDto);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
