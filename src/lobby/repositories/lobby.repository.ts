import { NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Lobby } from "../lobby.model";

export class LobbyRepository {
    constructor (
      @InjectModel('Lobby') private readonly lobbyModel: Model<Lobby> 
    ) {}

    create = this.lobbyModel;
    findOne = this.lobbyModel.findOne;
    update = this.lobbyModel.update;
    deleteOne = this.lobbyModel.deleteOne;

    async findAllLobby(stop: number): Promise<Lobby[]> {
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
      ): Promise<Lobby[]> {
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
    
      async findLobbyById(lobbyId: string): Promise<Lobby> {
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