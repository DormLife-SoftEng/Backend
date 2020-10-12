import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewQueryDto } from './review.validation';

@Controller('/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getReviewList(
    @Query('dormId') dormId: ReviewQueryDto,
    @Query('offset') offset: number,
    @Query('stop') stop: number,
  ) {
    const reviews = await this.reviewService.getReviewList();
    return reviews
  }

  @Post()
  addReview(@Query('dormId') dormId: ReviewQueryDto): string {
    return this.reviewService.postTest(dormId);
  }

  @Patch(':reviewId')
  editReview(
    @Param('reviewId') reviewId: string,
    @Query('dormId') dormId: string,
  ) {
    return this.reviewService.patchTest(reviewId, dormId);
  }

  @Delete(':reviewId')
  seleteReview(
    @Param('reviewId') reviewId: string,
    @Query('dormId') dormId: string,
  ) {
    return this.reviewService.deleteTest(reviewId, dormId);
  }
}
