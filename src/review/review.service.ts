import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ReviewBodyDto,
  ReviewParamDto,
  reviewCodeDto,
} from './review.dto';
import { Review } from '../review/review.model';
import { ReviewRepository } from './repositories/review.repositories';
import { UserRepository } from 'src/users/repositories/user.repository';
import { DormService } from 'src/dorm/dorm.service';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepo: ReviewRepository,
    private readonly UserRep: UserRepository,
    private readonly DormService: DormService
  ) {}

  private async findReviewByDormId(
    dormId: string,
    stop: number,
  ): Promise<Review[] | undefined> {
    try {
      const query = { 'dorm.dormId': dormId };
      const review = await this.reviewRepo.findWithPagination(query, stop);
      if (!review) {
        throw new Error('Empty Repository');
      }
      return review;
    } catch (error) {
      throw new NotFoundException('Could not find review.');
    }
  }

  private async findReviewByReviewCode(
    reviewCode: string,
    userId: string,
  ): Promise<Review[] | undefined> {
    try {
      const query = { 'dorm.code': reviewCode, 'user.userId': userId };
      const review = await this.reviewRepo.find(query);
      if (!review) {
        throw new Error('Empty Repository');
      }
      return review;
    } catch (error) {
      throw new NotFoundException('Could not find review.');
    }
  }

  private async findAndUpdateReview(
    reviewCode: reviewCodeDto,
    reviewBody: ReviewBodyDto,
    userId: string,
  ): Promise<any | undefined> {
    const query = {
      'dorm.code': reviewCode.reviewCode,
      'user.userId': userId,
    };
    const data = reviewBody;
    const options = {new: true};
    try {
      const review = await this.reviewRepo.findOneAndUpdate(query, data, options);
      if (!review) {
        throw new Error('Empty Repository');
      }
      return review;
    } catch (error) {
      throw new NotFoundException('Could not find review.');
    }
  }



  async getReviewList(dormId: string, offset: string, stop: string) {
    const _offset = parseInt(offset);
    const _stop = parseInt(stop);
    const review = await this.findReviewByDormId(dormId, _stop);
    const reviews = await Promise.all(review.map(async review => {
      const userdetails = await this.UserRep.findById(review.user.userId)
      return {
      id: review.id,
      dorm: review.dorm,
      user: {
        userId:review.user.userId,
        firstName: userdetails.name.firstName,
        lastName: userdetails.name.lastName,
        PictureProfile: userdetails.PictureProfile
      },
      star: review.star,
      comment: review.comment,
      image: review.image,
      createdOn: review.createdOn,
    }}))
    return reviews
      
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

  async addReview(reviewBody: ReviewBodyDto,userid:string) {
    const result = await this.reviewRepo.create(reviewBody,userid);
    return result.id as string;
  }

  async editReview(
    reviewCode: reviewCodeDto,
    reviewBody: ReviewBodyDto,
    userId: string,
  ) {
    const review = await this.findAndUpdateReview(
      reviewCode,
      reviewBody,
      userId,
    );
    return review.id as string;
  }

  async deleteReview(reviewId: ReviewParamDto) {
    const query = { _id: reviewId.reviewId };
    const review = await this.reviewRepo.findOne(query);
    const result = await this.reviewRepo.deleteOne(query); 
    try {
      if (result.n == 0) {
        const dorm = await this.DormService.getSingleDorm(review.dorm.dormId)
        dorm.avgStar = 0
        dorm.save()
        console.log(dorm.avgStar)
        throw new NotFoundException('Could not find review.');
      }
      const newStar = await this.reviewRepo.updateStar(review.dorm.dormId)
      console.log(newStar)
      return result;
    } catch (err) {
      throw err;
    }
  }


}
