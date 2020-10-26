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
  @IsString()
  @ApiProperty()
  dorm: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  user: string;

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
