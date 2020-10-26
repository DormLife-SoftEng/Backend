import { Injectable, HttpException, HttpStatus, InternalServerErrorException, Dependencies } from '@nestjs/common';
import {UserRepository} from './repositories/user.repository';
import {UserDocument} from './schemas/users.schemas';
import {CreateUserDto} from './dto/create-user.dto';
import {UserParsedDto} from './users.interface'
var bcrypt = require('bcryptjs');


@Injectable()
@Dependencies(UserRepository)
export class UsersService {
	constructor(
		private userRepo: UserRepository,
	) {}

	private userDtoConversion(dto: CreateUserDto): UserParsedDto{
		return {
			name: {
				firstName: dto.firstName,
				lastName: dto.lastName
			},
			telephone: dto.telephone,
			email: dto.email,
			natId: dto.natId,
			email_verified: (dto.email_verified == "true"),
			sex: dto.sex,
			hashedPassword: dto.password,
			userType: dto.userType,
			PictureProfile: null,
			refreshToken: null,
			createdOn: null,
			modifiedOn: null,

		}
	}

	async find(email: string): Promise<UserDocument | undefined> {
		const user = await this.userRepo.findByEmail(email);
		if (!user) {
			return null;
		}
		return user;
	}

	async findById(userId: string): Promise<UserDocument | undefined> {
		const user = await this.userRepo.findById(userId);
		if (!user) {
			return null;
		}
		return user;
	}

	async create(dto: CreateUserDto): Promise<string | undefined> {
		// Is unique
		const email = dto.email;
    const query = await this.userRepo.findByEmail(email);
    // validate
    if (dto.userType === 'owner') {
      try {
        if (!dto.telephone && !dto.natId ) {
          throw new Error('Missing required field');
        }
      } catch (err) {
        const _err = {detail: err};
        throw new HttpException({message: 'Input data validation failed', _err}, HttpStatus.BAD_REQUEST);
      }
    }
		try{
      if(query) {
        throw new Error();
      }
		} catch (error) {
      const errors = {detail: error};
			throw new HttpException({message: 'Input data validation failed', errors},
								    HttpStatus.BAD_REQUEST);
    }

    // resolve password before saving.
    dto.password = await bcrypt.hash(dto.password, 10);
    // Conversion
    const newDto = this.userDtoConversion(dto);
    const savedUser = await this.userRepo.create(newDto);
    return savedUser._id;
	}
}
