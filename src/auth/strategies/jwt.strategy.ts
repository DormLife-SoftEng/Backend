import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import {jwtConstants} from "../constants";
import {jwtPayload} from "../auth.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor () {
		super({
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				ignoreExpiration: false,
				secretOrKey: jwtConstants.secret,
		});
	}

	async validate(payload: any): Promise<jwtPayload> {
		return {
			userId: payload.userId,
			name: {
				firstName: payload.name.firstName,
				lastName: payload.name.lastName,
			},
			avatar: payload.string,
			role: payload.string,
		}
	}

}
