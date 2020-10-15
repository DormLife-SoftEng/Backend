import { Controller, UseGuards, Post, Request, Get, HttpCode, HttpStatus, Body, UnauthorizedException } from '@nestjs/common';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {AuthService} from './auth.service';
import {JwtAuthGuard} from './guards/jwt-auth.guard';
import {CreateUserDto} from 'src/users/dto/create-user.dto';
import {UsersService} from 'src/users/users.service';
import {jwtToken} from './auth.interface';
import {RoleGuard} from './guards/role.guard';
import {Role} from './decorator/role.decorator';
import {ApiTags, ApiBearerAuth, ApiOAuth2} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('oauth')
export class AuthController {
	constructor(
			private authServ: AuthService,
			private userServ: UsersService,
	) {}

	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('sign-in')
	async login(@Request() req) {
		const payload: jwtToken = await this.authServ.login(req.user);
		return payload;
	}

	@UseGuards(JwtAuthGuard)
	@ApiOAuth2([])
	@Post('sign-out')
	@HttpCode(HttpStatus.OK)
	async logOut(@Request() req) {
		const result = await this.authServ.invalidateToken(req.user.userId);
		if(!result){
			throw new UnauthorizedException();
		}
	}

	@UseGuards(JwtAuthGuard)
	@ApiOAuth2([])
	@HttpCode(HttpStatus.OK)
	@Get('verify-token')
	async verifyToken(@Request() req) {
		return req.user;
	}

	@UseGuards(JwtAuthGuard)
	@ApiOAuth2([])
	@Get('refresh-token')
	async refresh_token(@Request() req) {
		return req.user;
	}

	@Post('sign-up')
	async userCreation(@Body() createUserDto: CreateUserDto) {
		return this.userServ.create(createUserDto);
	}
}
