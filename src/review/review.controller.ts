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
  Request,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
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
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('general')
  async getReviewByReviewCode(
    @Query('reviewCode') reviewCode: string,
    @Request() req,
  ) {
    if (reviewCode === undefined) {
      throw new BadRequestException('reviewCode must be defined.');
    }
    const review = await this.reviewService.getSingleReviewByReviewCode(
      reviewCode,
      req.user.userId,
    );
    return review;
  }

  @Post()
  async addReview(@Body() reviewBody: ReviewBodyDto) {
    const generatedId = await this.reviewService.addReview(reviewBody);
    return { id: generatedId };
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('general')
  async editReview(
    @Query() reviewCode: reviewCodeDto,
    @Request() req,
    @Body() reviewBody: ReviewBodyDto,
  ) {
    const generatedId = await this.reviewService.editReview(
      reviewCode,
      reviewBody,
      req.user.userId,
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
