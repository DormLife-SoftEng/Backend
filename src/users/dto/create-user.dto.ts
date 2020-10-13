import { IsNotEmpty, IsEmail, Matches, IsIn } from 'class-validator';

const sex: string[] = ['male', 'female'];
const usertype: string[] = ['general', 'owner', 'admin'];

export class CreateUserDto {
	@IsNotEmpty()
	@Matches("/[a-zA-Z]+/")
	readonly firstName: string;

	@IsNotEmpty()
	@Matches("/[a-zA-Z]/")
	readonly secondName: string;

	@IsNotEmpty()
	@Matches("/[0-9]/")
	readonly telephone: string;

	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsIn(sex)
	readonly sex: string;

	@IsNotEmpty()
	readonly password: string;

	@IsNotEmpty()
	@IsIn(usertype)
	userType: string;
}
