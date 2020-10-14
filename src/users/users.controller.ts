import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController {
	constructor(private userServ: UsersService) {}
	//@Post('sign-up')
	//@HttpCode(HttpStatus.CREATED)
	//async createUser(@Body() createUserDto: CreateUserDto) {
	//	const userId = await this.userServ.create(createUserDto);
	//	return userId
	//}

}
