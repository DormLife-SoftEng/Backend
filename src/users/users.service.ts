import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {UserRepository} from './repositories/user.repository';
import {LoginUserDto} from './dto/login-user.dto';
import {UserDocument} from './schemas/users.schemas';
import {CreateUserDto} from './dto/create-user.dto';
import {validate} from 'class-validator';


@Injectable()
export class UsersService {
	constructor(private userRepo: UserRepository) {}

	async find(dto: LoginUserDto): Promise<UserDocument | undefined> {
		const user = await this.userRepo.findByEmail(dto.email);
		if (!user) {
			return null;
		}
		return user;
	}

	async create(dto: CreateUserDto): Promise<string | undefined> {
		// Is unique
		const email = dto.email;
		const query = await this.userRepo.findByEmail(email);

		if (query) {
			const errors = {email: 'This email has been registered.'};
			throw new HttpException({message: 'Input data validation failed', errors},
								    HttpStatus.BAD_REQUEST);
		}


		const errors = await validate(CreateUserDto);

		if (errors) {
			const _errors = {email: 'Invalid input.'};
			throw new HttpException({message: 'Input data validation failed', _errors},
								    HttpStatus.BAD_REQUEST);
		}
		else {
			const savedUser = await this.userRepo.create(dto);
			return savedUser._id;
		}
	}
}
