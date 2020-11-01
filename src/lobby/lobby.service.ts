import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Lobby } from './lobby.model';
import { chatDto, lobbyCodeDto, lobbyIdDto } from './lobby.dto';

import { DormService } from '../dorm/dorm.service';
import { UserRepository } from '../users/repositories/user.repository';
import { UsersService } from '../users/users.service';
import { LobbyRepository } from './repositories/lobby.repository';
import { UserDocument } from 'src/users/schemas/users.schemas';

@Injectable()
export class LobbyService {
  constructor(
    private readonly LobbyRepository: LobbyRepository,
    private readonly DormService: DormService,
    private readonly UsersService: UsersService,
    private readonly UsersRepository: UserRepository,
  ) {}

  async getAllLobbyList(
    offset: string,
    stop: string,
    dormId: string,
    roomId: string,
  ) {
    if (!(parseInt(offset) === parseFloat(offset) || offset === undefined)) {
      throw new BadRequestException('offset must be integer.');
    }

    if (!(parseInt(stop) === parseFloat(stop) || stop === undefined)) {
      throw new BadRequestException('stop must be integer.');
    }

    if (offset === undefined) {
      offset = '0';
    }

    if (stop === undefined) {
      stop = '50';
    }

    const _offset = parseInt(offset);
    const _stop = parseInt(stop);

    if (dormId === undefined && roomId === undefined) {
      const lobbies = await this.LobbyRepository.findAllLobby(_stop);
      return lobbies.slice(_offset).map(lobby => ({
        id: lobby.lobbyId,
        dormName:lobby.dorm.name,
        roomId: lobby.room._id,
        room:lobby.room.name,
        expireOn: lobby.expireOn,
        owner: lobby.owner,
        code: lobby.code,
        member: lobby.member,
        maxMember: lobby.maxMember,
        createdOn: lobby.createdOn,
        modifiedOn: lobby.modifiedOn,
      }));
    } else if (dormId !== undefined && roomId === undefined) {
      const lobbies = await this.LobbyRepository.findLobbyByDormId(_stop, dormId);
      return lobbies.slice(_offset).map(lobby => ({
        id: lobby.lobbyId,
        dormName:lobby.dorm.name,
        roomId: lobby.room._id,
        room:lobby.room.name,
        expireOn: lobby.expireOn,
        owner: lobby.owner,
        code: lobby.code,
        member: lobby.member,
        maxMember: lobby.maxMember,
        createdOn: lobby.createdOn,
        modifiedOn: lobby.modifiedOn,
      }));
    } else {
      const lobbies = await this.LobbyRepository.findLobbyByDormIdAndRoomId(
        _stop,
        dormId,
        roomId,
      );
      return lobbies.slice(_offset).map(lobby => ({
        id: lobby.lobbyId,
        dormName:lobby.dorm.name,
        room:lobby.room.name,
        roomId: lobby.room._id,
        expireOn: lobby.expireOn,
        owner: lobby.owner,
        code: lobby.code,
        member: lobby.member,
        maxMember: lobby.maxMember,
        createdOn: lobby.createdOn,
        modifiedOn: lobby.modifiedOn,
      }));
    }
  }

  async postNewLobby(dormId: string, roomId: string,owner: UserDocument) {
    function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }
    const Dorm = await this.DormService.getSingleDorm(dormId);
    const Room = await this.DormService.getDormRoom(dormId, roomId);
    const User = owner;
    let d = new Date();
    d.setHours(d.getHours() + 14 * 24);
    let code = makeid(5);
    console.log('Checkpoint Beta')
    while (await this.getIdByCode({lobbyCode: code})) {
      console.log(`Checkpoint Delta ${ await this.getIdByCode({lobbyCode: code})}`);
      code = makeid(5);
    }
    const newLobby = new this.LobbyRepository.create(
      {
        expireOn: d,
        dorm: Dorm,
        room:Room,
        owner: User,
        member: [{user:User,ready:true}],
        maxMember: Room.capacity,
        code: code,
        createdOn: Date.now(),
        modifiedOn: Date.now(),
      }
    )
    const result = await newLobby.save();
    return result.id as string;
  }

  async getLobbyById(lobbyId: lobbyIdDto) {
    const lobby = await this.LobbyRepository.findLobbyById(lobbyId);
    return lobby
    // return {
    //   id: lobby.lobbyId,
    //   expireOn: lobby.expireOn,
    //   owner: lobby.owner,
    //   code: lobby.code,
    //   member: lobby.member,
    //   maxMember: lobby.maxMember,
    //   createdOn: lobby.createdOn,
    //   modifiedOn: lobby.modifiedOn,
    // };
  }

  async getIdByCode(lobbyCode: lobbyCodeDto): Promise<lobbyIdDto> {
    const id = await this.LobbyRepository
      .findOne({ code: lobbyCode.lobbyCode })
    return id;
  }

  async joinLobbyID(user, lobbyId: lobbyIdDto) {
    let lobby;
    lobby = await this.LobbyRepository.findLobbyById(lobbyId);

    for (let i = 0; i < lobby.blackList.length; i++) {
      if (user._id === lobby.blackList[i]._id) {
        throw new ForbiddenException(lobby.blackList[i].message);
      }
    }

    lobby.member.push({user:user,ready:false});
    lobby.save();

    return { id: lobby._id };
  }

  async leaveLobby(user, lobbyId: lobbyIdDto) {
    let lobby;
    try {
      lobby = await this.LobbyRepository.update(
        { _id: lobbyId.lobbyId },
        { $pull: { member: user } },
      );
    } catch (error) {
      throw new NotFoundException('Could not find lobby.');
    }
    if (!lobby) {
      throw new NotFoundException('Could not find lobby.');
    }
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  async kickMember(user, lobbyId: lobbyIdDto, userId: string, message: string) {
    let lobby;
    try {
      lobby = await this.getLobbyById(lobbyId);

      if (user.id == lobby.owner.id) {
        const user2kick = await this.UsersRepository.findById(userId);

        lobby = await this.LobbyRepository.update(
          { _id: lobbyId.lobbyId },
          {
            $pull: { 'member.user': user2kick },
            $push: { blackList: { user: user2kick, message: message } },
          },
        );
      } else {
        throw new UnauthorizedException(
          'Only lobby owner can kick other member',
        );
      }
    } catch (error) {
      throw new NotFoundException('Could not find lobby.');
    }
    if (!lobby) {
      throw new NotFoundException('Could not find lobby.');
    }
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  async deleteLobby(lobbyId: lobbyIdDto) {
    const result = await this.LobbyRepository
      .deleteOne({ _id: lobbyId.lobbyId })
    if (result.n === 0) {
      throw new NotFoundException('Could not find lobby.');
    }
  }

  async setReady(lobbyId: lobbyIdDto, userId: string) {
    let lobby = await this.LobbyRepository.findLobbyById(lobbyId);
    for (let i = 0; i < lobby.member.length; i++) {
      if (lobby.member[i].user._id === userId) {
        lobby.member[i].ready = !lobby.member[i].ready;
      }
    }
    lobby.save();
  }

  async getChat(lobbyId: lobbyIdDto) {
    let lobby = await this.LobbyRepository.findLobbyById(lobbyId);

    return lobby.chat;
  }

  async addChat(lobbyId: lobbyIdDto, chat: chatDto) {
    let lobby = await this.LobbyRepository.findLobbyById(lobbyId);

    lobby.chat.push(chat);
    lobby.save();

    return {
      statusCode: 200,
      message: 'OK',
    };
  }
}
