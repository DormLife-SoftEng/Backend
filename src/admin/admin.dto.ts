import { IsArray, IsDate, isNotEmpty, IsNotEmpty, IsNotEmptyObject, IsString, ValidateIf } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class TicketBodyDto {
  @IsNotEmpty()
  @IsString()
  type: string
  
  @IsNotEmpty()
  @IsString()
  request: string

  @IsNotEmptyObject()
  @ApiProperty()
  target: any; // dormId or userId

  @IsNotEmptyObject()
  @ApiProperty()
  newdata: any; //

  @IsNotEmpty()
  // @IsDate()
  createdOn: Date;

  @IsNotEmptyObject()
  @IsString()
  @ApiProperty()
  createdBy: string; //userId

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  status: string;
}

export class TicketIdDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  ticketId: string
}
