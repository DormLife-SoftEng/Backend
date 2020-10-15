import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Lobby, LobbySchema } from './lobby.model';
import { LobbyModule } from './lobby.module';
import {} from './lobby.validation';
import { DormService } from '../Dorm/dorm.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class LobbyService {
  constructor(
    @InjectModel('Lobby') private readonly lobbyModel: Model<Lobby>,
    private readonly DormService: DormService,
    private readonly UsersService: UsersService,
  ) {}

  private async findAllLobby(stop: number): Promise<Lobby[]> {
    let lobbies;
    try {
      lobbies = await this.lobbyModel
        .find()
        .limit(stop)
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find any lobby.');
    }
    if (!lobbies) {
      throw new NotFoundException('Could not find any lobby.');
    }
    return lobbies;
  }

  private async findLobbyByDormId(stop: number, dormId: string) {
    let lobbies;
    try {
      lobbies = await this.lobbyModel
        .find({ 'dorm.id': dormId })
        .limit(stop)
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find lobby.');
    }
    if (!lobbies) {
      throw new NotFoundException('Could not find lobby.');
    }
    return lobbies;
  }

  private async findLobbyByDormIdAndRoomId(
    stop: number,
    dormId: string,
    roomId: string,
  ) {
    let lobbies;
    try {
      lobbies = await this.lobbyModel
        .find({ 'dorm.id': dormId, 'dorm.room.id': roomId })
        .limit(stop)
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find lobby.');
    }
    if (!lobbies) {
      throw new NotFoundException('Could not find lobby.');
    }
    return lobbies;
  }

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
      const lobbies = await this.findAllLobby(_stop);
      return lobbies.slice(_offset).map(lobby => ({
        id: lobby.lobbyId,
        expireOn: lobby.expireOn,
        owner: lobby.owner,
        member: lobby.member,
        maxMember: lobby.maxMember,
        createdOn: lobby.createdOn,
        modifiedOn: lobby.modifiedOn,
      }));
    } else if (dormId !== undefined && roomId === undefined) {
      const lobbies = await this.findLobbyByDormId(_stop, dormId);
      return lobbies.slice(_offset).map(lobby => ({
        id: lobby.lobbyId,
        expireOn: lobby.expireOn,
        owner: lobby.owner,
        member: lobby.member,
        maxMember: lobby.maxMember,
        createdOn: lobby.createdOn,
        modifiedOn: lobby.modifiedOn,
      }));
    } else {
      const lobbies = await this.findLobbyByDormIdAndRoomId(
        _stop,
        dormId,
        roomId,
      );
      return lobbies.slice(_offset).map(lobby => ({
        id: lobby.lobbyId,
        expireOn: lobby.expireOn,
        owner: lobby.owner,
        member: lobby.member,
        maxMember: lobby.maxMember,
        createdOn: lobby.createdOn,
        modifiedOn: lobby.modifiedOn,
      }));
    }
  }

  async postNewLobby(dormId: string, roomId: string) {
    const Dorm = await this.DormService.getSingleDorm(dormId);
    const Room = await this.DormService.getDormRoom(dormId, roomId);
    const User = this.UsersService;
    let d = new Date();
    d.setHours(d.getHours() + (14 * 24));
    const newLobby = new this.lobbyModel({
      expireOn: d,
      dorm: Dorm,
      owner: User,
      member: [User],
      maxMember: Room.capacity,
      createdOn: Date.now,
      modifiedOn: Date.now,
    });
    return newLobby;
  }
}
