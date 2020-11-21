import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Lobby, LobbySearch, Member } from './lobby.model';
import { chatDto, lobbyCodeDto, lobbyIdDto } from './lobby.dto';

import { DormService } from '../dorm/dorm.service';
import { UserRepository } from '../users/repositories/user.repository';
import { UsersService } from '../users/users.service';
import { LobbyRepository } from './repositories/lobby.repository';
import { UserDocument } from 'src/users/schemas/users.schemas';
import { generalUserInfo } from '../users/users.interface';

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
    if (!(parseInt(offset) == parseFloat(offset) || !offset)) {
      throw new BadRequestException('offset must be integer.');
    }

    if (!(parseInt(stop) == parseFloat(stop) || !stop)) {
      throw new BadRequestException('stop must be integer.');
    }

    if (!offset) {
      offset = '0';
    }

    if (!stop) {
      stop = '50';
    }

    const _offset = parseInt(offset);
    const _stop = parseInt(stop);

    if (!dormId && !roomId) {
      const lobbies = await this.LobbyRepository.findAllLobby(_stop);
      return lobbies.slice(_offset).map(lobby => ({
        id: lobby._id,
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
    } else if (dormId && roomId) {
      const lobbies = await this.LobbyRepository.findLobbyByDormId(_stop, dormId);
      return lobbies.slice(_offset).map(lobby => ({
        id: lobby._id,
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
        id: lobby._id,
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
    const User = this.UsersService.userDataToDtoConversion(owner);
    let d = new Date();
    d.setHours(d.getHours() + 14 * 24);
    let code = makeid(5) 
    console.log('Checkpoint Beta')
    console.log(code)
    while (await this.getIdByCode(code)) {
      console.log(`Checkpoint Delta ${ await this.getIdByCode(code)}`);
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

  async getLobbyById(lobbyId: string) {
    console.log(`getLobbyById : ${lobbyId}`)
    const lobby = await this.LobbyRepository.findLobbyById(lobbyId);
    return lobby
  }

  async getIdByCode(lobbyCode: string): Promise<any> {
    console.log(lobbyCode)
    const id = await this.LobbyRepository
      .findOne({ code: lobbyCode })
    return id;
  }

  async joinLobbyID(user: any, lobbyId: string) {
    const lobby = await this.LobbyRepository.findLobbyById({id:lobbyId});
    const UserDoc = await this.UsersService.findById(user.userId);
    const User: generalUserInfo = this.UsersService.userDataToDtoConversion(UserDoc);

    for (let i = 0; i < lobby.blackList.length; i++) {
      if (UserDoc._id == lobby.blackList[i].user.userId) {
        throw new ForbiddenException(lobby.blackList[i].message);
      }
    }
    lobby.member.push({user:User ,ready:false});
    lobby.save();

    return { id: lobby._id };
  }

  async leaveLobby(user: any, lobbyId: string) {
    let lobby;
    const UserDoc = await this.UsersService.findById(user.userId);
    const UserDto = this.UsersService.userDataToDtoConversion(UserDoc);
    console.log(UserDto)
    try {
      lobby = await this.LobbyRepository.update(
        { _id: lobbyId },
        { $pull: { member: {user:UserDto} } },
        
      );
      console.log(lobby)
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

  async kickMember(user: any, lobbyId: string, userId: string, message: string) {
    // console.log(lobbyId)
    const userDoc = await this.UsersService.findById(user.userId);
    const userDto = this.UsersService.userDataToDtoConversion(userDoc);
    try {
      // console.log(lobbyId)
      const lobbytmp = {id:lobbyId}
      const lobby: LobbySearch = await this.LobbyRepository.findLobbyById(lobbytmp);
      if (!lobby) {
        throw new NotFoundException('Could not find lobby.');
      }
      if (userDto.userId.toString() == lobby.owner.userId) {
        const _user2kick = await this.UsersRepository.findById(userId);
        const user2kick = this.UsersService.userDataToDtoConversion(_user2kick);
        const lobby2get = {id:lobbyId}
        const uplobby = await this.LobbyRepository.findLobbyById(lobby2get);
        for (var i=0;i<uplobby.member.length;i++) {
          if (uplobby.member[i].user.userId.toString() != user2kick.userId) {
          }
          else {
            uplobby.member.splice(i,1)
            uplobby.blackList.push({user:user2kick,message:message});
            break
          }
        }

        uplobby.save();
      } else {
        throw new UnauthorizedException(
          'Only lobby owner can kick other member',
        );
      }
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof NotFoundException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException();
    }
    
    return {
      statusCode: 200,
      message: 'OK',
    };
  }

  async deleteLobby(lobbyId: string) {
    const result = await this.LobbyRepository
      .deleteOne({ _id: lobbyId})
    if (result.n == 0) {
      throw new NotFoundException('Could not find lobby.');
    }
  }

  async setReady(lobbyId: string, userId: string) {
    let lobby = await this.LobbyRepository.findLobbyById(lobbyId);
    for (let i = 0; i < lobby.member.length; i++) {
      if (lobby.member[i].user.userId == userId) {
        console.log(lobby.member[i].ready)
        lobby.member[i].ready = !(lobby.member[i].ready);
        console.log(lobby.member[i].ready)
      }
    }
    lobby.save();
  }

  async getChat(lobbyId: string) {
    let lobby = await this.LobbyRepository.findLobbyById(lobbyId);

    return lobby.chat;
  }

  async addChat(lobbyId: string, chat: chatDto, userInfo: any) {
    const lobby = await this.LobbyRepository.findLobbyById(lobbyId);
    const userDoc =  await this.UsersService.findById(userInfo.userId);
    const userDto = this.UsersService.userDataToDtoConversion(userDoc);
    chat.user = userDto;
    chat.time = Date();
    lobby.chat.push(chat);
    lobby.save();
    console.log(chat)

    return {
      statusCode: 200,
      message: 'OK',
    };
  }
}
