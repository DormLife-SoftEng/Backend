import { Injectable } from '@nestjs/common';
import { ReviewQueryDto } from './review.validation';
import { Review } from '../review/review.model'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
  ) {}

  getTest(dormId: ReviewQueryDto, offset: number, stop: number): string {
    return `Get Test<br>dormId: ${dormId}<br>offset: ${offset}<br>stop: ${stop}`;
  }

  async getReviewList(dormId: ReviewQueryDto, offset: number, stop: number) {
    const reviews = await this.reviewModel.find().exec();
    return reviews.map(prod => ({
      id: prod.id,
      dorm: prod.dorm,
      user: prod.user,
      star: prod.star,
      comment: prod.comment,
      image: prod.image,
      createdOn: prod.createdOn;
    }));
  }

  postTest(dormId: ReviewQueryDto): string {
    return `Post Test<br>dormId: ${dormId}`;
  }

  patchTest(reviewId: string, dormId: string): string {
    return `Post Test<br>reviewId: ${reviewId}<br>dormId: ${dormId}`;
  }

  deleteTest(reviewId: string, dormId: string): string {
    return `Delete Test<br>reviewId: ${reviewId}<br>dormId: ${dormId}`;
  }
}
