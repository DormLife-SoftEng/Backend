import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ReviewBodyDto,
  ReviewParamDto,
  reviewCodeDto,
} from './review.validation';
import { Review } from '../review/review.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
  ) {}

  private async findReviewByDormId(
    dormId: string,
    stop: number,
  ): Promise<Review[]> {
    let review;
    try {
      review = await this.reviewModel
        .find({ 'dorm._id': dormId })
        .limit(stop)
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find review.');
    }
    if (!review) {
      throw new NotFoundException('Could not find review.');
    }
    return review;
  }

  private async findReviewByReviewCode(
    reviewCode: string,
    userId: string,
  ): Promise<Review[]> {
    let review;
    try {
      review = await this.reviewModel
        .find({ 'dorm.code': reviewCode, 'user.userId': userId })
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find review.');
    }
    if (!review) {
      throw new NotFoundException('Could not find review.');
    }
    return review;
  }

  private async findAnUpdateReview(
    reviewCode: reviewCodeDto,
    reviewBody: ReviewBodyDto,
    userId: string,
  ): Promise<Review> {
    let review;
    try {
      review = await this.reviewModel
        .findOneAndUpdate(
          {
            'dorm.code': reviewCode.reviewCode,
            'user.userId': userId,
          },
          reviewBody,
          {
            new: true,
          },
        )
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find review.');
    }
    if (!review) {
      throw new NotFoundException('Could not find review.');
    }
    return review;
  }

  async getReviewList(dormId: string, offset: string, stop: string) {
    const _offset = parseInt(offset);
    const _stop = parseInt(stop);
    const review = await this.findReviewByDormId(dormId, _stop);
    return review
      .map(review => ({
        id: review.id,
        dorm: review.dorm,
        user: review.user,
        star: review.star,
        comment: review.comment,
        image: review.image,
        createdOn: review.createdOn,
      }))
      .slice(_offset);
  }

  async getSingleReviewByReviewCode(
    reviewCode: string,
    userId: string,
  ) {
    const review = await this.findReviewByReviewCode(reviewCode, userId);
    return review
      .map(review => ({
        id: review.id,
        dorm: review.dorm,
        user: review.user,
        star: review.star,
        comment: review.comment,
        image: review.image,
        createdOn: review.createdOn,
      }))
  }

  async addReview(reviewBody: ReviewBodyDto) {
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

  async editReview(
    reviewCode: reviewCodeDto,
    reviewBody: ReviewBodyDto,
    userId: string,
  ) {
    const review = await this.findAnUpdateReview(
      reviewCode,
      reviewBody,
      userId,
    );
    return review.id as string;
  }

  async deleteReview(reviewId: ReviewParamDto) {
    const result = await this.reviewModel.deleteOne({ _id: reviewId.reviewId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find review.');
    }
  }
}
