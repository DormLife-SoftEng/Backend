import {
  BadRequestException,
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
import {
  ReviewQueryDto,
  ReviewBodyDto,
  ReviewParamDto,
  reviewCodeDto,
} from './review.validation';

@Controller('/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getReviewList(
    @Query() dormId: ReviewQueryDto,
    @Query('offset') offset: string,
    @Query('stop') stop: string,
  ) {
    if (!(parseInt(offset) === parseFloat(offset) || offset === undefined)) {
      throw new BadRequestException('offset must be integer.');
    }

    if (!(parseInt(stop) === parseFloat(stop) || stop === undefined)) {
      throw new BadRequestException('stop must be integer.');
    }

    if (offset === undefined) {
      offset = '0';
    }

    if (stop === undefined) {
      stop = '50';
    }

    const reviews = await this.reviewService.getReviewList(
      dormId,
      offset,
      stop,
    );
    return reviews;
  }

  @Post()
  async addReview(@Body() reviewBody: ReviewBodyDto) {
    const generatedId = await this.reviewService.addReview(reviewBody);
    return { id: generatedId };
  }

  @Patch()
  async editReview(
    @Query() reviewCode: reviewCodeDto,
    @Query('userId') userId: string, // mocked user id
    @Body() reviewBody: ReviewBodyDto,
  ) {
    const generatedId = await this.reviewService.editReview(
      reviewCode,
      reviewBody,
      userId,
    );
    return { id: generatedId };
  }

  @Delete(':reviewId')
  async seleteReview(
    @Param() reviewId: ReviewParamDto,
    @Query() reviewCode: reviewCodeDto,
  ) {
    return this.reviewService.deleteReview(reviewId, reviewCode);
  }
}
