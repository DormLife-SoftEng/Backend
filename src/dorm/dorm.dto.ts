import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, Matches, IsString, IsNumberString, IsEmail, IsUrl} from "class-validator";

export class addDorm {
	@ApiProperty()
	@IsNotEmpty()
	@Matches(/[a-zA-Z]+/)
	readonly name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@Matches(/[0-9]+/)
	readonly telephone: string;

	@ApiProperty()
	@IsEmail()
	readonly email: string;

	@ApiProperty()
	@IsString()
	readonly lineID: string;

	@ApiProperty()
	@IsUrl()
	readonly website: string;

	@ApiProperty()
	@IsNotEmpty()
	coordinate: [number];

	@ApiProperty()
	type: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	allowedSex: string;

}
