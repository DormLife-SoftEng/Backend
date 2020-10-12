import { Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ReviewService } from './review.service';


@Controller('/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  getTest(@Query()): string {
    return this.reviewService.getTest();
  }

  // @Post()
  // postTest(): string {
  //   return this.reviewService.test();
  // }

  // @Patch(':id')
  // patchTest(@Param('id') prodId: string) {
  //   return this.reviewService.test();
  // }
}
