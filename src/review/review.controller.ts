import { Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewQueryDto } from './review.validation';

@Controller('/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  getTest(
    @Query('dormId') dormId: ReviewQueryDto,
    @Query('offset') offset: number,
    @Query('stop') stop: number,
  ): string {
    return this.reviewService.getTest(dormId, offset, stop);
  }

  @Post()
  postTest(@Query('dormId') dormId: ReviewQueryDto): string {
    return this.reviewService.postTest(dormId);
  }

  @Patch(':reviewId')
  patchTest(
    @Param('reviewId') reviewId: string,
    @Query('dormId') dormId: string,
  ) {
    return this.reviewService.patchTest(reviewId, dormId);
  }

  @Delete(':reviewId')
  deleteTest(
    @Param('reviewId') reviewId: string,
    @Query('dormId') dormId: string,
  ) {
    return this.reviewService.deleteTest(reviewId, dormId);
  }
}
