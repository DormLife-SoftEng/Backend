import { Provider } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { User, UserDocument } from "../schemas/users.schemas";
import { UserParsedDto } from "../users.interface";
import { UserRepository } from "./user.repository";

let dto: UserParsedDto = {
  'name': { 'firstName': 'test', 'lastName': 'test' },
  'PictureProfile': 1,
  'email': 'email@email.com',
  'email_verified': true,
  'hashedPassword': '2oi4jpo12$pdkpko123',
  'createdOn': 'date',
  'modifiedOn': 'date',
  'natId': '120321331323',
  'refreshToken': 'ipjfipqokrjho30ru390rlfkpke',
  'sex': 'male',
  'telephone': '0394u80129800-1',
  'userType': 'general',
}

class UserModelMock {

  constructor (private data) {}
  save = jest.fn().mockResolvedValue(this.data);
  static findOne = jest.fn().mockResolvedValue({...dto, _id: 'inkiojounmd9'});
  static findById = jest.fn().mockResolvedValue({...dto, _id: 'inkiojounmd9'});

}

describe('UserRepositoryMock', () => {
  let repository: UserRepository;
  beforeEach(async () => {
    const UserModelProvider: Provider = {
      provide: getModelToken("User"),
      useValue: UserModelMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        UserModelProvider,
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  it('Should create document', async () => {
    const res: UserDocument = await repository.create(dto);
    expect(res).toBeDefined()
  });
  it('Should find one by email', async () => {
    const res = repository.findByEmail('test@test.com');
    expect(res).toBeDefined();
  })
  it('Should find one by id', async () => {
    const res = repository.findById('inkiojounmd9');
    expect(res).toBeDefined();
  })
});