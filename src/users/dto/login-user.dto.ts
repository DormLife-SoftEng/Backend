import {IsNotEmpty, IsEmail} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class LoginUserDto {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty()
	readonly email: string;

	@IsNotEmpty()
	@ApiProperty()
	readonly password: string;
}
