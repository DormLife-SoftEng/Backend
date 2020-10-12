import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewService {
  getTest(): string {
    return 'Get Test';
  }


}