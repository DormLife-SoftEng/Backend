import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

import {LoginUserDto} from './dto/login-user.dto';
import {User, UserDocument} from './schemas/users.schemas';
import {CreateUserDto} from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UserParsedDto } from './users.interface';
import { HttpException } from '@nestjs/common';

class UserRepositoryMock {
  users: string[]
  userIds: string[]
  constructor() {
    this.users = ['email@email.com']
    this.userIds = []
  }

  async find({ email, password }: LoginUserDto): Promise<User | undefined> {
    const user = new User();
    user.email = email;
    return user;
  }
  
  async create(createUserDto: UserParsedDto): Promise<any> {
    // Parsing
    this.users.push(createUserDto.email);
    this.userIds.push('1234567890')
    return {_id: '1234567890'};
  }

  async findAll(): Promise<string[]> {
      return this.users;
  }

  async findByEmail(emailQuery: string): Promise<string> {
      return this.users.find(email => email === emailQuery);
  }

  async findById(userId: string): Promise<string> {
      return this.userIds.find(id => id === userId);
  }
}

describe('UserServiceMock', () => {
    let service: UsersService;
    let validGenUserCreateDto: CreateUserDto = {
      'email': 'test@dormlife.com',
      'email_verified': 'true',
      'firstName': 'test',
      'lastName': 'test',
      'password': '1234',
      'sex': 'male',
      'userType': 'general',
    }
    
    let validOwnerUserCreateDto: CreateUserDto = {
      'email': 'owner@dormlife.com',
      'email_verified': 'true',
      'firstName': 'test',
      'lastName': 'test',
      'password': '1234',
      'sex': 'male',
      'userType': 'owner',
      'telephone': '123456667',
      'natId': '0123456789',
    }

    let invalidOwnerUserCreateDto: CreateUserDto = {
      'email': 'owner@dormlife.com',
      'email_verified': 'true',
      'firstName': 'test',
      'lastName': 'test',
      'password': '1234',
      'sex': 'male',
      'userType': 'owner',
      'telephone': null,
      'natId': null,
    }


    beforeEach( async() => {
        const UserRepositoryProvider = {
            provide: UserRepository,
            useClass: UserRepositoryMock,
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService, UserRepositoryProvider],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('Should not find non-existing user', async () => {
        const email = 'test@dormlife.com';
        await service.find(email).then( (result) => expect(result).toBeNull())
    });

    it('Should not find non-existing user id', async () => {
      const id = '0123456789';
      const userId = await service.findById(id);
      expect(userId).toBeNull();
    });

    it('Should create general user', async () => {
      await service.create(validGenUserCreateDto).then( (result) => expect(result).toBeDefined());
    });

    it('Should create general user and find by email', async () => {
      const result = await service.create(validGenUserCreateDto)
      await service.find(validGenUserCreateDto.email).then( (result) => expect(result).toBeDefined());
    });

    it('Should create general user and find by id', async () => {
      const result = await service.create(validGenUserCreateDto);
      await service.findById(result).then( (_result) => expect(_result).toBeDefined());
    });

    it('Should create owner user and find existing user', async () => {
      const result = service.create(validOwnerUserCreateDto)
      await service.find(validOwnerUserCreateDto.email).then( (result) => expect(result).toBeDefined());
    });

    it('Should not create any user if existed', async () => {
      const result =  await service.create(validOwnerUserCreateDto);
      try {
        await service.create(validOwnerUserCreateDto);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
      }
    });

    it('Should not create owner user if invalid', async () => {
      const result =  await service.create(validOwnerUserCreateDto);
      try {
        await service.create(invalidOwnerUserCreateDto);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
      }
    });

})
