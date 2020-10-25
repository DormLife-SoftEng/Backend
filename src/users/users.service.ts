import { Injectable, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import {UserRepository} from './repositories/user.repository';
import {UserDocument} from './schemas/users.schemas';
import {CreateUserDto} from './dto/create-user.dto';
import {UserParsedDto} from './users.interface'
import {validate} from 'class-validator';
import {DormService} from 'src/dorm/dorm.service';
import {Dorm} from 'src/dorm/dorm.model';
import {addDorm} from 'src/dorm/dorm.dto';
var bcrypt = require('bcryptjs');


@Injectable()
export class UsersService {
	constructor(
		private userRepo: UserRepository,
		private readonly dormServ: DormService,
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
			PicProf: Math.floor(Math.random() * 3),
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
		if (!dto.telephone) {
			dto.telephone = '';
		}

		if (!dto.natId) {
			dto.natId = '';
		}

		if (query) {
			const errors = {email: 'This email has been registered.'};
			throw new HttpException({message: 'Input data validation failed', errors},
								    HttpStatus.BAD_REQUEST);
		}

		const errors = validate(CreateUserDto);

		if ((await errors).length > 0) {
			const _errors = {email: 'Invalid input.', detaiL: errors};
			throw new HttpException({message: 'Input data validation failed', _errors},
								    HttpStatus.BAD_REQUEST);
		}
		else {
			// resolve password before saving.
			dto.password = await bcrypt.hash(dto.password, 10);
			// Conversion
			const newDto = this.userDtoConversion(dto);
			newDto.PicProf = Math.floor(Math.random() * 3);
			const savedUser = await this.userRepo.create(newDto);
			return savedUser._id;
		}
	}

	async findDormById(owner: UserDocument): Promise<Dorm[]|undefined> {
		try {
			const dorm = await this.dormServ.getDormByOwner(owner);
			return dorm;
		} catch(err) {
			console.log(err);
			throw new InternalServerErrorException('Fatal: Unable to process the request');
		}
	}

	async addDormWithOwner(owner: UserDocument, addDormDto: addDorm) {
		// ?
	}
}
