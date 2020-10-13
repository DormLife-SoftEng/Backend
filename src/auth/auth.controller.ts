import { Controller, UseGuards, Post, Request, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {AuthService} from './auth.service';
import {JwtAuthGuard} from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private authServ: AuthService) {}
	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Request() req) {
		return this.authServ.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Get('verifyToken')
	getProfile(@Request() req) {
		return req.user;
	}
}
