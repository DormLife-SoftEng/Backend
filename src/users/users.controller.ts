import { Controller, Post, Request, HttpCode, HttpStatus, Body, UseGuards, Get } from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UsersService} from './users.service';
import {ApiTags, ApiOAuth2} from '@nestjs/swagger';
import {UserRegisterRes, generalUserInfo} from './users.interface';
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard';
import {UserDocument} from './schemas/users.schemas';
import {Dorm} from 'src/dorm/dorm.model';

@Controller('users')
@ApiTags('Users')
export class UsersController {
	constructor(private userServ: UsersService) {}

	@Post('sign-up')
	async userCreation(@Body() createUserDto: CreateUserDto): Promise<UserRegisterRes> {
		const userId = await this.userServ.create(createUserDto);
		return {
			userId: userId
		}
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiOAuth2([])
	async getUserInfo(@Request() req): Promise<generalUserInfo> {
		const userDoc = await this.userServ.findById(req.user.userId);
		return {
			name: {
				firstName: userDoc.name.firstName,
				lastName: userDoc.name.lastName,
			},
			telephone: userDoc.telephone,
			email: userDoc.email,
			email_verified: userDoc.email_verified,
			profilePic: userDoc.PictureProfile,
			sex: userDoc.sex,
			createdOn: userDoc.createdOn,
			modifiedOn: userDoc.modifiedOn,
			userType: userDoc.userType,
		}
	}

}
