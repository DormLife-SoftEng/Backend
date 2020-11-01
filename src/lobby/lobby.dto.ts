import { IsDate, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { UserDocument } from 'src/users/schemas/users.schemas';

export class createLobbyDto {
    @IsString()
    @IsNotEmpty()
    dormId: string

    @IsString()
    @IsNotEmpty()
    roomId: string
}

export class lobbyIdDto {
    // @IsNotEmpty()
    // @IsString()
    lobbyId: string
}

export class lobbyCodeDto {
    // @IsNotEmpty()
    @IsString()
    lobbyCode: string
}

export class chatDto {
    @IsNotEmpty()
    @IsObject()
    user: UserDocument

    @IsNotEmpty()
    @IsString()
    message: string

    @IsNotEmpty()
    @IsDate()
    time: Date
}