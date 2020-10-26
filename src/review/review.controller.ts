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
  Request,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewBodyDto, ReviewParamDto, reviewCodeDto } from './review.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/decorator/role.decorator';

@Controller('/reviews')
@ApiTags('Reviews')
@UseGuards(JwtAuthGuard, RoleGuard)
@Role('general')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @ApiQuery({ name: 'dormId', required: false })
  @ApiQuery({ name: 'reviewCode', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'stop', required: false })
  async getReviewList(
    @Request() req,
    @Query('dormId') dormId: string,
    @Query('reviewCode') reviewCode: string,
    @Query('offset') offset: string,
    @Query('stop') stop: string,
  ) {
    if (
      (reviewCode === undefined && dormId === undefined) ||
      (reviewCode !== undefined && dormId !== undefined)
    ) {
      throw new BadRequestException(
        'Only one of reviewCode or dormId values ​​must be specified.',
      );
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

    if (reviewCode === undefined) {
      const reviews = await this.reviewService.getReviewList(
        dormId,
        offset,
        stop,
      );
      return reviews;
    } else if (dormId === undefined) {
      if (req.user._id === undefined) {
        throw new BadRequestException('userId must be defined.');
      }
      const review = await this.reviewService.getSingleReviewByReviewCode(
        reviewCode,
        req.user._id,
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
    @Request() req,
    @Body() reviewBody: ReviewBodyDto,
  ) {
    const generatedId = await this.reviewService.editReview(
      reviewCode,
      reviewBody,
      req.user._id,
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
