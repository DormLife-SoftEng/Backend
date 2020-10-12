import { Injectable } from '@nestjs/common';
import { ReviewQueryDto } from './review.validation';

@Injectable()
export class ReviewService {
  getTest(dormId: ReviewQueryDto, offset: number, stop: number): string {
    return `Get Test<br>dormId: ${dormId}<br>offset: ${offset}<br>stop: ${stop}`;
  }

  postTest(dormId: ReviewQueryDto): string {
    return `Post Test<br>dormId: ${dormId}`
  }

  patchTest(reviewId: string, dormId: string): string {
    return `Post Test<br>reviewId: ${reviewId}<br>dormId: ${dormId}`
  }
}
