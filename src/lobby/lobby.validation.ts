import { IsNotEmpty, IsString } from 'class-validator';

export class createLobbyDto {
    @IsString()
    @IsNotEmpty()
    dormId: string

    @IsString()
    @IsNotEmpty()
    roomId: string
}
