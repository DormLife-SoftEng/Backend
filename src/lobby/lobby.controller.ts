import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { UserDocument } from '../users/schemas/users.schemas';
import { createLobbyDto } from './lobby.validation';

@Controller('/lobbies')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Get()
  async getAllLobbyList(
    @Query('offset') offset: string,
    @Query('stop') stop: string,
    @Query('dormId') dormId: string,
    @Query('roomId') roomId: string,
  ) {
    if (dormId === undefined && roomId !== undefined) {
      throw new BadRequestException('dormId must be defined.');
    }
    const lobbiesList = await this.lobbyService.getAllLobbyList(
      offset,
      stop,
      dormId,
      roomId,
    );

    return lobbiesList;
  }

  @Post()
  async createNewLobby(@Query() createNewLobbyQueryParam: createLobbyDto) {
    const newLobby = await this.lobbyService.postNewLobby(
      createNewLobbyQueryParam.dormId,
      createNewLobbyQueryParam.roomId,
    );
    return newLobby;
  }
}
