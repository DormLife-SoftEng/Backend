import { IsNotEmpty, IsEmail, Matches, IsIn, IsBoolean, IsString, MinLength, MaxLength, Length } from 'class-validator';
import {Exclude, Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';


const sex: string[] = ['male', 'female'];
const allowedUsertype: string[] = ['general', 'owner'];

export class CreateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Matches(/[a-zA-Z]+/)
	readonly firstName: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Matches(/[a-zA-Z]+/)
	readonly lastName: string;

	@ApiProperty()
	readonly telephone?: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsIn(["true", "false"])
	email_verified: string;

	@ApiProperty()
	@IsIn(sex)
	readonly sex: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsIn(allowedUsertype)
	readonly userType: string;

	@ApiProperty()
	readonly natId?: string;
}
