import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UsersService} from './users.service';
import {ApiTags} from '@nestjs/swagger';
import {UserRegisterRes} from './users.interface';

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
}
