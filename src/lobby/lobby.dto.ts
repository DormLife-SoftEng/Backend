import { IsNotEmpty, IsString } from 'class-validator';

export class createLobbyDto {
    @IsString()
    @IsNotEmpty()
    dormId: string

    @IsString()
    @IsNotEmpty()
    roomId: string
}

export class lobbyIdDto {
    @IsNotEmpty()
    @IsString()
    lobbyId: string
}

export class lobbyCodeDto {
    @IsNotEmpty()
    @IsString()
    lobbyCode: string
}