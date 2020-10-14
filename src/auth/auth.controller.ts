import { Controller, UseGuards, Post, Request, Get, HttpCode, HttpStatus, Body, Logger, SetMetadata } from '@nestjs/common';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {AuthService} from './auth.service';
import {JwtAuthGuard} from './guards/jwt-auth.guard';
import {CreateUserDto} from 'src/users/dto/create-user.dto';
import {UsersService} from 'src/users/users.service';
import {accessToken} from './auth.interface';
import {RoleGuard} from './guards/role.guard';
import {Role} from './decorator/role.decorator';


@Controller('auth')
export class AuthController {
	constructor(
			private authServ: AuthService,
			private userServ: UsersService,
	) {}

	private readonly logger = new Logger (AuthController.name);
	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('sign-in')
	async login(@Request() req) {
		this.logger.log('Login Complete' + `${req.user}`);
		const payload: accessToken = await this.authServ.login(req.user);
		return payload;
	}

	@UseGuards(JwtAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Get('verify-token')
	async verifyToken(@Request() req) {
		return req.user.role;
	}

	@UseGuards(JwtAuthGuard, RoleGuard)
	@Role('owner')
	@Get('check-general')
	async check_general(@Request() req) {
		return req.user;
	}

	@Post('sign-up')
	async userCreation(@Body() createUserDto: CreateUserDto) {
		return this.userServ.create(createUserDto);
	}
}
