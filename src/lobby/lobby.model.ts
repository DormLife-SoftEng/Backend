import * as mongoose from 'mongoose';
import { generalUserInfo } from 'src/users/users.interface';
import { DormSchema, Dorm, RoomInterface, RoomSchema } from '../dorm/dorm.model';
import { User, UserDocument } from '../users/schemas/users.schemas';
import {LobbyMember} from './lobby.interfaces';

export const LobbySchema = new mongoose.Schema({
  expireOn: { type: Date },
  dorm: DormSchema,
  room:RoomSchema,
  owner: {},
  code: { type: String },
  member: { type: [{ user: {}, ready: Boolean }] },
  blackList: { type: [{ user: {}, message: String }] },
  maxMember: { type: Number },
  createdOn: { type: Date },
  modifiedOn: { type: Date },
  chat: { type: [{ user: {}, message: String, time: Date }] },
});

export interface Lobby extends mongoose.Document {
  lobbyId: string;
  expireOn: Date;
  owner: UserDocument;
  code: string;
  member: [LobbyMember];
  blackList: [{ user: UserDocument; message: string }];
  maxMember: number;
  createdOn: Date;
  modifiedOn: Date;
  chat: [{ user: UserDocument; message: string; time: Date }];
}

export interface LobbySearch extends mongoose.Document{
  id: string;
  expireOn: Date;
  dorm:Dorm;
  room:RoomInterface;
  owner: generalUserInfo;
  code: string;
  member: [LobbyMember];
  blackList: [{ user: generalUserInfo; message: string }];
  maxMember: number;
  createdOn: Date;
  modifiedOn: Date;
  chat: [{ user: generalUserInfo; message: string; time: string }];
}

export interface Member {
  user:generalUserInfo,
  ready:boolean
}