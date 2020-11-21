import { IsNotEmpty, IsArray, IsInt, IsString, ValidateIf, IsNumberString, IsNumber } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';


export class reviewCodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  reviewCode: string;
}

export class ReviewBodyDto {
  @IsNotEmpty()
  @ApiProperty()
  dorm: any;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  star: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  comment: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  image: [string];
}

export class ReviewParamDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  reviewId: string
}
