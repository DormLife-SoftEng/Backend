import {Injectable, UnauthorizedException, Logger} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";
import {LoginUserDto} from "src/users/dto/login-user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super();
	}
	private readonly logger = new Logger(LocalStrategy.name);
	async validate(username: string, password: string): Promise<any> {
		const user = await this.authService.validateUser(username, password);
		this.logger.log('local-strategy: ' + `${username}` + `${user}`);
		if (!user) {
			throw new UnauthorizedException('Invalid User Data');
		}
		return user;
	}
}
