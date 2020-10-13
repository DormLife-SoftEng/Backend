import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ReviewQueryDto,
  ReviewBodyDto,
  ReviewParamDto,
  dormIdDto,
} from './review.validation';
import { Review } from '../review/review.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
  ) {}

  private async findReview(
    dormId: ReviewQueryDto,
    stop: number,
  ): Promise<Review[]> {
    let review;
    try {
      review = await this.reviewModel
        .find({ 'dorm.dormId': dormId.dormId })
        .limit(stop)
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!review) {
      throw new NotFoundException('Could not find product.');
    }
    // review = await this.reviewModel
    //     .find({ 'dorm.dormId': dormId.dormId })
    //     .limit(stop)
    //     .exec();
    return review;
  }

  async getReviewList(dormId: ReviewQueryDto, offset: string, stop: string) {
    const _offset = parseInt(offset);
    const _stop = parseInt(stop);
    const review = await this.findReview(dormId, _stop);
    return review.map(review => ({
      id: review.id,
      dorm: review.dorm,
      user: review.user,
      star: review.star,
      comment: review.comment,
      image: review.image,
      createdOn: review.createdOn,
    })).slice(_offset);
  }

  async addReview(reviewBody: ReviewBodyDto) {
    console.log(Date.now());
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

  async editReview(reviewId: ReviewParamDto, dormId: dormIdDto) {
    return `Post Test<br>reviewId: ${reviewId}<br>dormId: ${dormId}`;
  }

  async deleteReview(reviewId: ReviewParamDto, dormId: dormIdDto) {
    return `Delete Test<br>reviewId: ${reviewId}<br>dormId: ${dormId}`;
  }
}
