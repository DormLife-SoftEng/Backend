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
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  ReviewBodyDto,
  ReviewParamDto,
  reviewCodeDto,
} from './review.validation';

@Controller('/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getReviewList(
    @Query('dormId') dormId: string,
    @Query('offset') offset: string,
    @Query('stop') stop: string,
  ) {
    if (dormId === undefined) {
      throw new BadRequestException('dormId values ​​must be specified.');
    }

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

  @Get('users')
  @UseGuards(JwtA)
  async getReviewByReviewCode(@Query('reviewCode') reviewCode: string) {
    if (userId === undefined) {
      throw new BadRequestException('userId must be defined.');
    }
    const review = await this.reviewService.getSingleReviewByReviewCode(
      reviewCode,
      userId
    );
    return review;
  }
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
  async seleteReview(@Param() reviewId: ReviewParamDto) {
    await this.reviewService.deleteReview(reviewId);
    return {
      statusCode: 200,
      message: 'OK',
    };
  }
}
