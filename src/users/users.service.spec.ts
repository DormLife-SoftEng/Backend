import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

import {LoginUserDto} from './dto/login-user.dto';
import {User} from './schemas/users.schemas';
import {CreateUserDto} from './dto/create-user.dto';

class UserRepositoryMock {
  async find({ email, password }: LoginUserDto): Promise<User | undefined> {
    const user = new User();
    user.emailInfo = { email: email, verified: true };
    return user;
  }
  async create(dto: CreateUserDto): Promise<string> {
    const userId = '012345678910';
    return userId;
  }
}

describe('UserServiceMock', () => {
	let service: UsersService;

	beforeAll( async() => {
		const UserServiceProvider = {
			provide: UsersService,
			useClass: UserRepositoryMock,
		};
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersService, UserServiceProvider],
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	it('Should create user and obtain info', async () => {
		const email = 'test@DormLife';
		const password = 'test';
		const user = new User();
		user.emailInfo = {'email': email, verified: true};

		const getuser = await service.find({email, password});
		expect(user.emailInfo).toEqual(getuser.emailInfo);
	});
})
