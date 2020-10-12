import { IsNotEmpty } from 'class-validator';

export class ReviewQueryDto {
    @IsNotEmpty()
    dormID: string;
  }