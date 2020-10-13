import { IsNotEmpty, IsArray, IsInt, IsString, ValidateIf, IsNumberString, IsNumber } from 'class-validator';
import { type } from 'os';

export class ReviewQueryDto {
  @IsNotEmpty()
  @IsString()
  dormId: string;
}

export class offsetStopDto {
  @ValidateIf(offset => offset === undefined || typeof(offset) === typeof(""))
  @IsNumberString()
  offset: string;

  @ValidateIf(stop => stop === undefined || typeof(stop) === typeof(""))
  @IsNumberString()
  stop: string;
}

export class dormIdDto {
  @IsString()
  dormId: string;
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