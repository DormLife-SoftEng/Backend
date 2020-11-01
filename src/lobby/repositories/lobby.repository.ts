import { NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { lobbyIdDto } from "../lobby.dto";
import { Lobby, LobbySearch } from "../lobby.model";

export class LobbyRepository {
    constructor (
      @InjectModel('Lobby') private readonly lobbyModel: Model<LobbySearch> 
    ) {}

    create = this.lobbyModel;
    async findOne(query) {
      return await this.lobbyModel.findOne(query);
    }
    async update (query, data) {
      return await this.lobbyModel.update(query, data);
    }
    async deleteOne(query) {
      return await this.lobbyModel.deleteOne(query);
    }

    async findAllLobby(stop: number): Promise<LobbySearch[]> {
        try {
          const lobbies = await this.lobbyModel
            .find()
            .limit(stop);
          if (!lobbies) {
            throw new Error('Empty Repository.');
          }
          return lobbies;
        } catch (error) {
          throw new NotFoundException('Could not find any lobby.');
        }
      }
    
      async findLobbyByDormId(stop: number, dormId: string) {
        try {
          const lobbies = await this.lobbyModel
            .find({ 'dorm.id': dormId })
            .limit(stop);
          if (!lobbies) {
            throw new Error('Empty Repository.');
          }
          return lobbies;
        } catch (error) {
          throw new NotFoundException('Could not find lobby.');
        }
      }
    
      async findLobbyByDormIdAndRoomId(
        stop: number,
        dormId: string,
        roomId: string,
      ): Promise<LobbySearch[]> {
        try {
          const lobbies = await this.lobbyModel
            .find({ 'dorm.id': dormId, 'dorm.room.id': roomId })
            .limit(stop);
          if (!lobbies) {
            throw new Error('Empty Repository.');
          }
          return lobbies;
        } catch (error) {
          throw new NotFoundException('Could not find lobby.');
        }
      }
    
      async findLobbyById(lobbyId: lobbyIdDto): Promise<LobbySearch> {
        try {
          const lobby = await this.lobbyModel.findOne({ _id: lobbyId });
          if (!lobby) {
            throw new Error('Empty Repository.');
          }
          return lobby;
        } catch (error) {
          throw new NotFoundException('Could not find lobby.');
        }
      }
}