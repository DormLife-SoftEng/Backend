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
import { createLobbyDto, lobbyIdDto, lobbyCodeDto, chatDto } from './lobby.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserDocument } from 'src/users/schemas/users.schemas';
import { UsersService } from 'src/users/users.service';

@Controller('/lobbies')
@ApiTags('Lobby')
@UseGuards(JwtAuthGuard, RoleGuard)
@Role('general')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService,
    private readonly userServ: UsersService,
    ) {}

  @Get()
  async getAllLobbyList(
    @Query('offset') offset: string,
    @Query('stop') stop: string,
    @Query('dormId') dormId: string,
    @Query('roomId') roomId: string,
  ) {
    const lobbiesList = await this.lobbyService.getAllLobbyList(
      offset,
      stop,
      dormId,
      roomId,
    );
    var newLobbyList = []
    for (var i = 0;i < lobbiesList.length;i++) {
      if (lobbiesList[i].member.length != lobbiesList[i].maxMember) {
        newLobbyList.push(lobbiesList[i])
      }
    }

    return newLobbyList;
  }

  @Post()
  async createNewLobby(
    @Request() req,
    @Query() createNewLobbyQueryParam: createLobbyDto,
  ) {
    const userDoc: UserDocument = await this.userServ.findById(req.user.userId);
    console.log('Checkpoin Alpha')
    const generatedId = await this.lobbyService.postNewLobby(
      createNewLobbyQueryParam.dormId,
      createNewLobbyQueryParam.roomId,
      userDoc
    );
    return { id: generatedId };
  }
  @Get('/check')
  async checkLobby(@Request() req) {
    const res = await this.lobbyService.checkLobby(req.user.userId)
    return res
  }
  @Get(':id')
  async getSpecificLobby(@Request() req, @Param('id') lobbyId: string) {
    const lobby = await this.lobbyService.getLobbyById(lobbyId);
    return lobby;
  }

  @Get('/codes')
  async getIdByCode(@Request() req, @Query() lobbyCode: string) {
    const lobbyId = await this.lobbyService.getIdByCode(lobbyCode);
    return { lobbyId: lobbyId };
  }
  generalUserInfo
  @Put('/join')
  async joinLobbyID(
    @Request() req,
    @Query('id') id: string,
    @Query('lobbyCode') lobbyCode: string,
  ) {
    // if (id && lobbyCode) {
    //   console.log(lobbyCode)
    //   console.log(id)
    //   throw new BadRequestException('Only one of lobbyCode or lobbyId should be defined at the time.');
    // }
    console.log(`This is data: ${id},  ${lobbyCode}`)

    if (!lobbyCode) {
      const result = await this.lobbyService.joinLobbyID(req.user, id);
      return result;
    } else {
      const id = await this.lobbyService.getIdByCode(lobbyCode);
      const result = await this.lobbyService.joinLobbyID(req.user, id);
      return result;
    }
  }

  @Put(':id/leave')
  async leaveLobby(@Request() req, @Param('id') id: string) {
    console.log(id)
    const result = await this.lobbyService.leaveLobby(req.user, id);
    return result;
  }

  @Put(':id/kick')
  async kickMember(
    @Request() req,
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Body('message') message: string,
  ) {
    console.log(`id ${id}`)
    const result = await this.lobbyService.kickMember(
      req.user,
      id,
      userId,
      message,
    );
    return result;
  }

  @Delete(':id/delete')
  async deleteLobby(@Param('id') id: string) {
    const res = await this.lobbyService.deleteLobby(id);
    console.log(res);
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  @Patch(':id/ready')
  async setReady(@Param('id') id: string, @Request() req) {
    await this.lobbyService.setReady(id, req.user.userId);
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  @Delete(':id/close')
  async closeLobby(@Param('id') id: string) {
    console.log(`this is id ${id}`)
    const lobby = await this.lobbyService.getLobbyById(id);
    console.log("hee")
    console.log(id)
    for (let i = 0; i < lobby.member.length; i++) {
      if (lobby.member[i].ready === false) {
        throw new PreconditionFailedException('All user should be ready.');
      }
    }
    await this.lobbyService.deleteLobby(id);
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  @Get(':id/chat')
  async getChat(@Param('id') id: string) {
    const chat = await this.lobbyService.getChat(id);
    
    return chat;
  }

  @Post(':id/chat')
  async addChat(@Param('id') id: string, @Body() chat: chatDto, @Request() req) {
    
    const res = await this.lobbyService.addChat(id, chat, req.user);

    return res
  }

  
}
