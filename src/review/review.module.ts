import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [
    // MongooseModule.forRoot(
    // 	'MONGO_URI',
    // ),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
