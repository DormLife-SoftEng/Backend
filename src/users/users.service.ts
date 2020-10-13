import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {UserRepository} from './repositories/user.repository';
import {LoginUserDto} from './dto/login-user.dto';
import {User} from './schemas/users.schemas';
import {CreateUserDto} from './dto/create-user.dto';
import {validate} from 'class-validator';


@Injectable()
export class UsersService {
	constructor(private userRepo: UserRepository) {}

	async find({email, password}: LoginUserDto): Promise<User | undefined> {
		const user = await this.userRepo.findByEmail(email);
		if (!user) {
			return null;
		}
		// verification goes here

		// verification ends here

		// if the worlds has fails
		return null;
	}

	async create(dto: CreateUserDto): Promise<any> {
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
	}
	}
}
