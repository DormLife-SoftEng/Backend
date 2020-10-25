import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, Matches, IsString, IsNumberString, IsEmail, IsUrl} from "class-validator";
import { UserDocument } from "src/users/schemas/users.schemas";
import { RoomInterface, UtilityInterface } from "./dorm.model";

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

export class propsSearchDto {
  //dorm
  dormName: string;
  distance: number; // address.coord - kaset.coord
  rating: number;
  gender: string;
  //room
  price: number;
  maxperson: number;
  dormType: string;
  //room2
  kitchen: number; //true = 0, false = 999999999999999999
  aircond: number; //true = 0, false = 999999999999999999
  bathroom: number; //true = 0, false = 999999999999999999
  bedroom: number; //true = 0, false = 999999999999999999

  //util
  // in utility.type
  convenienceStore: string; //true = convenienceStore, false = ''
  laundry: string; // true = laundry, false = ''
  parking: string;
  pet: string;
  internet: string;
  smoking: string;
  fitness: string;
  pool: string;
  cooking: string;
}

interface Room {
  name: string;
  capacity: number;
  image: string[];
  bathroom: number;
  aircond: number;
  kitchen: number;
  bedroom: number;
  description: string;
  price: {
    amount: number;
    pricePer: number;
  };
  allowedSex: string;
}

interface Utility {
  type: string;
  distance: number;
  description: string;
}

export class DormAddDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  owner: UserDocument;

  @IsString()
  @IsNotEmpty()
  readonly telephone: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly lineID: string;

  @IsString()
  @IsNotEmpty()
  readonly website: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  readonly coordinate: number[];

  @IsNotEmpty()
  readonly utilities: UtilityInterface[];

  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  rooms: RoomInterface[];

  @IsString()
  @IsNotEmpty()
  readonly allowedSex: string;

  @IsNotEmpty()
  image: string[];
  
  @IsNotEmpty()
  license: string[];
}
