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
	@Expose()
	telephone: string;

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
	readonly userType: string;

	@ApiProperty()
	@Expose()
	natId: string;
}
