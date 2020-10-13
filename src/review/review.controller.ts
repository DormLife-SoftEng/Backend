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
  offsetStopDto,
  dormIdDto,
} from './review.validation';

@Controller('/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getReviewList(
    @Query() dormId: ReviewQueryDto,
    @Query() offsetStop: offsetStopDto,
  ) {
    console.log(offsetStop.offset);
    if (!(parseInt(offsetStop.offset) === parseFloat(offsetStop.offset) || (offsetStop.offset === undefined))) {
      throw new BadRequestException("offset must be integer.");
    }

    if (!(parseInt(offsetStop.stop) === parseFloat(offsetStop.stop) || (offsetStop.stop === undefined))) {
      throw new BadRequestException("stop must be integer.");
    }

    if (offsetStop.offset === undefined) {
      offsetStop.offset = "0";
    }

    if (offsetStop.stop === undefined) {
      offsetStop.stop = "50";
    }

    const reviews = await this.reviewService.getReviewList(
      dormId,
      offsetStop.offset.toString(),
      offsetStop.stop.toString(),
    );
    return reviews;
  }

  @Post()
  async addReview(@Body() reviewBody: ReviewBodyDto) {
    // console.log(reviewBody);
    const generatedId = await this.reviewService.addReview(reviewBody);
    return { id: generatedId };
  }

  @Patch(':reviewId')
  async editReview(
    @Param() reviewId: ReviewParamDto,
    @Query() dormId: dormIdDto,
  ) {
    return this.reviewService.editReview(reviewId, dormId);
  }

  @Delete(':reviewId')
  async seleteReview(
    @Param() reviewId: ReviewParamDto,
    @Query() dormId: dormIdDto,
  ) {
    return this.reviewService.deleteReview(reviewId, dormId);
  }
}
