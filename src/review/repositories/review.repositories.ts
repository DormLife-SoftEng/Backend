import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ModelOptions, MongooseFilterQuery, Query } from 'mongoose';
import { DormService } from 'src/dorm/dorm.service';
import { ReviewBodyDto } from '../review.dto';
import { Review, ReviewPrimitive } from '../review.model';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
    private readonly DormService: DormService,
  ) {}

  async create(
    reviewBody: ReviewBodyDto,
    user: string,
    options?: ModelOptions,
    fn?: any,
  ): Promise<Review | undefined> {
    const dto: ReviewPrimitive = {
      ...reviewBody,
      user: { userId: user },
      createdOn: new Date().toString(),
    };
    const dormId = dto.dorm.dormId;
    const dorm = await this.DormService.getSingleDorm(dormId);
    dto.dorm = { dormId: dormId, code: dorm.code };
    const query = { 'dorm.dormId': dormId };
    const reviews = await this.find(query);
    const count = reviews.length;

    const document = new this.reviewModel(dto);
    const result = await document.save(options, fn);
    // this.updateReviewScore(dto.dorm.dormId, dto.star, count);
    const newStar = await this.updateStar(dto.dorm.dormId)
    console.log(newStar)
    return result;
  }

  // async updateReviewScore(
  //   dormId: string,
  //   incStar: number,
  //   reviewsCount: number,
  // ) {
  //   const dorm = await this.DormService.getSingleDorm(dormId);
  //   const query = { 'dorm.dormId': dormId };
  //   const reviews = await this.find(query);
  //   const oldStar = dorm.avgStar * reviewsCount;
  //   const newCount = reviews.length;
  //   const newStar = (oldStar + incStar) / newCount;
  //   dorm.avgStar = newStar;
  //   dorm.save();
  // }
  //new update
  async updateStar(dormId:string) {
    const dorm = await this.DormService.getSingleDorm(dormId)
    const reviews = await this.reviewModel.find({'dorm.dormId': dormId})

    var total = 0
    for (var i = 0; i < reviews.length; i++) {
      total = total + reviews[i].star
    }
    const result = total/reviews.length
    dorm.avgStar = result
    dorm.save()
    return result
  }

  async find(
    query: any,
    projection?: any,
    callback?: any,
  ): Promise<Review[] | undefined> {
    const result = await this.reviewModel.find(query, projection, callback);
    return result;
  }


  async findWithPagination(
    query: any,
    stop: number,
    projection?: any,
    callback?: any,
  ): Promise<Review[] | undefined> {
    const result = await this.reviewModel
      .find(query, projection, callback)
      .limit(stop);
    return result;
  }

  async findOneAndUpdate(query: any, data: any, options?: any, callback?: any) {
    try {
      const result = await this.reviewModel.findOneAndUpdate(
        query,
        data,
        options,
        callback,
      );
      return result;
    } catch (err) {
      throw new Error('Update Failure');
    }
  }

  async findOne(query:any) {
    const result = await this.reviewModel.findOne(query)
    return result
  }

  async deleteOne(
    query: any,
    options?: ModelOptions,
    callback?: any,
  ): Promise<any> {
    const result = await this.reviewModel.deleteOne(query, options, callback);
    return result;
  }
}
