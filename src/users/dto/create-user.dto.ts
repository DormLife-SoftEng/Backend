import { IsNotEmpty, IsEmail, Matches, IsIn, IsBoolean, IsString, MinLength, MaxLength } from 'class-validator';
import {Exclude, Expose} from 'class-transformer';


const sex: string[] = ['male', 'female'];
const allowedUsertype: string[] = ['general', 'owner'];

@Exclude()
export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	@Expose()
	@Matches(/[a-zA-Z]+/)
	readonly firstName: string;

	@IsNotEmpty()
	@IsString()
	@Expose()
	@Matches(/[a-zA-Z]+/)
	readonly lastName: string;

	@IsNotEmpty()
	@IsString()
	@Expose()
	@Matches(/[0-9]+/)
	readonly telephone: string;

	@IsNotEmpty()
	@IsEmail()
	@Expose()
	readonly email: string;

	@IsNotEmpty()
	@Expose()
	@IsIn(["true", "false"])
	email_verified: string;

	@IsIn(sex)
	@Expose()
	readonly sex: string;

	@IsNotEmpty()
	@Expose()
	password: string;

	@IsNotEmpty()
	@Expose()
	@IsIn(allowedUsertype)
	userType: string;

	@IsNotEmpty()
	@Expose()
	@MinLength(13)
	@MaxLength(13)
	@Matches(/[0-9]+/)
	natId: string;
}
