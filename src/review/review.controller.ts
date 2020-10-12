import {
  Body,
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
import { ReviewBodyDto } from './review.bodyDto';

@Controller('/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getReviewList(
    @Query('dormId') dormId: ReviewQueryDto,
    @Query('offset') offset: number,
    @Query('stop') stop: number,
  ) {
    const reviews = await this.reviewService.getReviewList(
      dormId,
      offset,
      stop,
    );
    return reviews;
  }

  @Post()
  async addReview(@Body() reviewBody: ReviewBodyDto) {
    console.log("Here");
    console.log(reviewBody);
    const generatedId = await this.reviewService.addReview(reviewBody);
    return { id: generatedId };
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
