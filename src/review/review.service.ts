import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewService {
  getTest(dormId: string, offset: number, stop: number): string {
    return `Get Test<br>dormId: ${dormId}<br>offset: ${offset}<br>stop: ${stop}`;
  }

  postTest(dormId: string): string {
    return `Post Test<br>dormId: ${dormId}`
  }

  patchTest(reviewId: string, dormId: string): string {
    return `Post Test<br>reviewId: ${reviewId}<br>dormId: ${dormId}`
  }
}
