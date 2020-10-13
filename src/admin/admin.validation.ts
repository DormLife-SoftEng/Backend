import { IsArray, IsNotEmpty, IsNotEmptyObject, IsString, ValidateIf } from 'class-validator';

export class TicketBodyDto {
  @IsNotEmptyObject()
  target: any;

  @IsNotEmptyObject()
  newdata: any;

  @IsNotEmptyObject()
  @ValidateIf(elem => elem !== undefined)
  createdBy: {
    userId: string;
    name: {
      firstname: string;
      lastname: string;
    };
    profilePic: string;
  };

  @IsArray()
  status: [string];
}

export class TicketIdDto {
  @IsNotEmpty()
  @IsString()
  ticketId: string
}