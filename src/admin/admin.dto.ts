import { IsArray, isNotEmpty, IsNotEmpty, IsNotEmptyObject, IsString, ValidateIf } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class TicketBodyDto {
  @IsNotEmpty()
  @IsString()
  type: string

  @IsNotEmptyObject()
  @ApiProperty()
  target: any;

  @IsNotEmptyObject()
  @ApiProperty()
  newdata: any;

  @IsNotEmptyObject()
  @ApiProperty()
  @ValidateIf(elem => elem !== undefined)
  createdBy: {
    userId: string;
    name: {
      firstname: string;
      lastname: string;
    };
    profilePic: string;
  };

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
