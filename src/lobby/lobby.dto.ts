import { IsDate, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDocument } from 'src/users/schemas/users.schemas';
import { generalUserInfo } from 'src/users/users.interface';

export class createLobbyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    dormId: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    roomId: string
}

export class lobbyIdDto {
    // @IsNotEmpty()
    // @IsString()
    lobbyId: string
}

export class lobbyCodeDto {
    // @IsNotEmpty()
    // @IsString()
    lobbyCode: string
}

export class chatDto {
    user: generalUserInfo

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    message: string

    time: string
}