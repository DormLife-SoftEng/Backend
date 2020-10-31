import { Provider } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { ReviewRepository } from "./review.repositories";

class ReviewModel {
  constructor (private data) {}
  save = jest.fn().mockResolvedValue(this.data);
  static findOne = jest.fn().mockResolvedValue({_id: 'einrvvpokmn'});
  static findById = jest.fn().mockResolvedValue({_id: 'dpojcsijvpso'});
}

describe('Review Repository Test', () => {
  let repository: ReviewRepository;
  

  beforeEach(async () => {
    const ReviewModelProvider: Provider = {
      provide: getModelToken('Review'),
      useValue: ReviewModel
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewRepository, ReviewModelProvider],
    }).compile();
    repository = module.get<ReviewRepository>(ReviewRepository);
  });

  it('Create', async () => {
    const res = await repository.create({comment: 'dada', dorm: 'dad', 'image': ['opajdj'], 'star': 5, 'user': 'dadasdadaf'});
    expect(res).toBeDefined();
  });

  it('Delete One', async () => {
    await repository.create({comment: 'dada', dorm: 'dad', 'image': ['opajdj'], 'star': 5, 'user': 'dadasdadaf'});
    const res = await repository.deleteOne({'qwepoj': 'aodoan'});
  });

  it('find', async () => {
    await repository.create({comment: 'dada', dorm: 'dad', 'image': ['opajdj'], 'star': 5, 'user': 'dadasdadaf'});
    const res = await repository.find('query');
  });


});