import { IsNotEmpty, IsArray, IsInt, IsString, ValidateIf, IsNumberString, IsNumber } from 'class-validator';

export class reviewCodeDto {
  @IsString()
  @IsNotEmpty()
  reviewCode: string;
}

export class ReviewBodyDto {
  @IsNotEmpty()
  dorm: any;

  @IsNotEmpty()
  user: any;

  @IsNotEmpty()
  @IsInt()
  star: number;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsArray()
  image: [string];
}

export class ReviewParamDto {
  @IsNotEmpty()
  @IsString()
  reviewId: string
}