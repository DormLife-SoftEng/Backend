import { IsNotEmpty } from 'class-validator';

export class ReviewBodyDto {
    @IsNotEmpty()
    id: string;

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

    @IsNotEmpty()
    createdOn: Date;
  }