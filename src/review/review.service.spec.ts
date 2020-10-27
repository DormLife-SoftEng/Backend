import { NotFoundException, Provider } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ModelOptions, Query } from "mongoose";
import { ReviewRepository } from "./repositories/review.repositories";
import { ReviewBodyDto } from "./review.dto";
import { Review, ReviewPrimitive } from "./review.model";
import { ReviewService } from "./review.service";


class ReviewRepositoryMock {
  collection: any[];
  dto: any;
  constructor () {
    this.collection = [];
    this.dto = null;
  }

  async create(reviewBody: ReviewBodyDto, options?:ModelOptions, fn?: any): Promise<any | undefined> {
    const dto: ReviewPrimitive = {...reviewBody, createdOn: new Date().toString()};
    const result = {...dto, id: '092u9eji093ur3jhrb9'};
    this.dto = {...result};
    this.collection.push({...result});
    return this.dto;
  }

  async find(query: any, projection?: any, callback?: any): Promise<any | undefined> {
    if( this.collection.length > 0) {
      return this.collection;
    }
    return null;
  }

  async findWithPagination(query: any, stop: number, projection?: any,  callback?:any): Promise<any | undefined> {
    if( this.collection.length > 0) {
      return this.collection;
    }
    return null;
  }

  async findOneAndUpdate(query: any, data: any, options?: any, callback?: any): Promise<any> {
    if( this.collection.length > 0) {
      return this.dto;
    }
    return null;
  }

  async deleteOne(query: any, options?:ModelOptions, callback?: any): Promise<any> {
    if( this.collection.length > 0) {
      return {ok: 1, n: 1};
    }
    else return {ok: 1, n: 0};
  }
}


describe('Review Service Testing', () => {
  let service: ReviewService;
  let reviewBody: ReviewBodyDto = {
    'comment': 'test',
    'dorm': {Dorm: 'obj'},
    'image': ['path'],
    'star': 4,
    'user': '4'
  }

  beforeEach( async () => {
      const ReviewRepositoryProvider: Provider = {
          provide: ReviewRepository,
          useClass: ReviewRepositoryMock
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [ReviewService, ReviewRepositoryProvider],
      }).compile();
      service = module.get<ReviewService>(ReviewService);
  });

  it('Add review', async () => {
    const result = await service.addReview(reviewBody);
    expect(result).toBeTruthy();
  });

  it('Remove review -- Exists', async () => {
    await service.addReview(reviewBody);
    const result = await service.deleteReview({'reviewId': '102i3092u01293u'});
    expect(result).toBeTruthy();
  });

  it('Remove review -- Not Exists', async () => {
    try {
      const result = await service.deleteReview({'reviewId': '102i3092u01293u'});
      expect(null).toBeTruthy();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('Edit review -- Exists', async () => {
    const res = await service.addReview(reviewBody);
    const result = await service.editReview({'reviewCode': 'kopjojoj'}, reviewBody, 'u1u9u29u32oij9');
    expect(result).toBeTruthy();
  });

  it('Edit review -- Not exists', async () => {
    try {
      const result = await service.editReview({'reviewCode': 'kopjojoj'}, reviewBody, 'u1u9u29u32oij9');
      expect(null).toBeTruthy();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
    
  });

  it('Get review by review code -- Success', async () => {
    const res = await service.addReview(reviewBody);
    const result = await service.getSingleReviewByReviewCode('testCode', '9-2euoijr808y9');
    expect(result).toHaveLength(1);
  });

  it('Get review by review code -- Fail', async () => {
    try {
      const result = await service.getSingleReviewByReviewCode('testCode', '9-2euoijr808y9');
      expect(null).toBeTruthy();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

  it('Get Review List -- Success', async () => {
    const res = await service.addReview(reviewBody);
    const result = await service.getReviewList('sdadq3fefef', '0', '123');
    expect(result.length).toBeGreaterThanOrEqual(1)
  });

  it('Get Review List -- Fail', async () => {
    try {
      const result = await service.getReviewList('sdadq3fefef', '0', '123');
      // If not failed ->
      expect(null).toBeTruthy();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });

});