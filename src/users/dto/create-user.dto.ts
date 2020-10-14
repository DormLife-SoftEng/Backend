import { IsNotEmpty, IsEmail, Matches, IsIn, IsBoolean, IsString, MinLength, MaxLength } from 'class-validator';
import {Exclude, Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';


const sex: string[] = ['male', 'female'];
const allowedUsertype: string[] = ['general', 'owner'];

@Exclude()
export class CreateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Expose()
	@Matches(/[a-zA-Z]+/)
	readonly firstName: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Expose()
	@Matches(/[a-zA-Z]+/)
	readonly lastName: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Expose()
	@Matches(/[0-9]+/)
	readonly telephone: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	@Expose()
	readonly email: string;

	@ApiProperty()
	@IsNotEmpty()
	@Expose()
	@IsIn(["true", "false"])
	email_verified: string;

	@ApiProperty()
	@IsIn(sex)
	@Expose()
	readonly sex: string;

	@ApiProperty()
	@IsNotEmpty()
	@Expose()
	password: string;

	@ApiProperty()
	@IsNotEmpty()
	@Expose()
	@IsIn(allowedUsertype)
	userType: string;

	@ApiProperty()
	@IsNotEmpty()
	@Expose()
	@MinLength(13)
	@MaxLength(13)
	@Matches(/[0-9]+/)
	natId: string;
}
