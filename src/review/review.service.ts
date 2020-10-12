import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewQueryDto } from './review.validation';
import { Review } from '../review/review.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewBodyDto } from './review.bodyDto'

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
  ) {}

  private async findReview(dormId: ReviewQueryDto): Promise<Review[]> {
    let review;
    try {
      review = await this.reviewModel.find({"dorm.dormId": dormId}).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!review) {
      throw new NotFoundException('Could not find product.');
    }
    return review;
  }

  async getReviewList(dormId: ReviewQueryDto, offset: number, stop: number) {
    const review = await this.findReview(dormId);
    return review.map(review => ({
      id: review.id,
      dorm: review.dorm,
      user: review.user,
      star: review.star,
      comment: review.comment,
      image: review.image,
      createdOn: review.createdOn,
    }));
  }

  async addReview(reviewBody: ReviewBodyDto) {
    console.log(Date.now())
    const newReview = new this.reviewModel({
      dorm: reviewBody.dorm,
      user: reviewBody.user,
      star: reviewBody.star,
      comment: reviewBody.comment,
      image: reviewBody.image,
      createdOn: Date.now(),
    });
    const result = await newReview.save();
    return result.id as string;
  }

  patchTest(reviewId: string, dormId: string): string {
    return `Post Test<br>reviewId: ${reviewId}<br>dormId: ${dormId}`;
  }

  deleteTest(reviewId: string, dormId: string): string {
    return `Delete Test<br>reviewId: ${reviewId}<br>dormId: ${dormId}`;
  }
}
