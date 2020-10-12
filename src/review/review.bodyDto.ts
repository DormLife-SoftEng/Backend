import { IsNotEmpty } from 'class-validator';

export class ReviewBodyDto {
    @IsNotEmpty()
    dorm: any;

    @IsNotEmpty()
    user: any;

    @IsNotEmpty()
    star: number;

    @IsNotEmpty()
    comment: string;

    @IsNotEmpty()
    image: [string];
  }