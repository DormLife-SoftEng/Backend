import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  UseGuards,
  Request,
  Delete,
  Patch,
  PreconditionFailedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/decorator/role.decorator';
import { LobbyService } from './lobby.service';
import { createLobbyDto, lobbyIdDto, lobbyCodeDto } from './lobby.dto';

@Controller('/lobbies')
@UseGuards(JwtAuthGuard, RoleGuard)
@Role('general')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Get()
  async getAllLobbyList(
    @Request() req,
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
  async createNewLobby(
    @Request() req,
    @Query() createNewLobbyQueryParam: createLobbyDto,
  ) {
    const generatedId = await this.lobbyService.postNewLobby(
      createNewLobbyQueryParam.dormId,
      createNewLobbyQueryParam.roomId,
    );
    return { id: generatedId };
  }

  @Get(':id')
  async getSpecificLobby(@Request() req, @Param() lobbyId: lobbyIdDto) {
    const lobby = await this.lobbyService.getLobbyById(lobbyId);
    return lobby;
  }

  @Get('/codes')
  async getIdByCode(@Request() req, @Query() lobbyCode: lobbyCodeDto) {
    const lobbyId = await this.lobbyService.getIdByCode(lobbyCode);
    return { lobbyId: lobbyId };
  }

  @Put(':id/join')
  async joinLobbyID(
    @Request() req,
    @Param() id: lobbyIdDto,
    @Query('lobbyCode') lobbyCode: lobbyCodeDto,
  ) {
    if (id !== undefined && lobbyCode !== undefined) {
      throw new BadRequestException(
        'Only one of lobbyCode or lobbyId should be defined at the time.',
      );
    }

    if (lobbyCode !== undefined) {
      const result = await this.lobbyService.joinLobbyID(req.user, id);
      return result;
    } else {
      const id = await this.lobbyService.getIdByCode(lobbyCode);
      const result = await this.lobbyService.joinLobbyID(req.user, id);
      return result;
    }
  }

  @Put(':id/leave')
  async leaveLobby(@Request() req, @Query('lobbyId') lobbyId: lobbyIdDto) {
    const result = await this.lobbyService.leaveLobby(req.user, lobbyId);
    return result;
  }

  @Put(':id/kick')
  async kickMember(
    @Request() req,
    @Query('lobbyId') lobbyId: lobbyIdDto,
    @Query('userId') userId: string,
  ) {
    const result = await this.lobbyService.kickMember(
      req.user,
      lobbyId,
      userId,
    );
    return result;
  }

  @Delete(':id/delete')
  async deleteLobby(@Request() req, @Param() lobbyId: lobbyIdDto) {
    await this.lobbyService.deleteLobby(lobbyId);
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  @Patch(':id/ready')
  async setReady(@Param() lobbyId: lobbyIdDto, @Request() req) {
    await this.lobbyService.setReady(lobbyId, req.user.userId);
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  @Delete(':id/close')
  async closeLobby(@Param() lobbyId: lobbyIdDto) {
    const lobby = await this.lobbyService.getLobbyById(lobbyId);
    for (let i = 0; i < lobby.member.length; i++) {
      if (lobby.member[i].ready === false) {
        throw new PreconditionFailedException('All user should be ready.');
      }
    }
    await this.lobbyService.deleteLobby(lobbyId);
    return {
      statusCode: 200,
      message: 'OK',
    };
  }
}
