import * as mongoose from 'mongoose';
import { DormSchema } from '../dorm/dorm.model';
import { UserDocument } from '../users/schemas/users.schemas';

export const LobbySchema = new mongoose.Schema({
  expireOn: { type: Date },
  dorm: DormSchema,
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
  member: [{ user: UserDocument; ready: boolean }];
  blackList: [{ user: UserDocument; message: string }];
  maxMember: number;
  createdOn: Date;
  modifiedOn: Date;
  chat: [{ user: UserDocument; message: string; time: Date }];
}

export interface LobbySearch extends mongoose.Document{
  lobbyId: string;
  expireOn: Date;
  dorm:any,
  owner: UserDocument;
  code: string;
  member: [{ user: UserDocument; ready: boolean }];
  blackList: [{ user: UserDocument; message: string }];
  maxMember: number;
  createdOn: Date;
  modifiedOn: Date;
  chat: [{ user: UserDocument; message: string; time: Date }];
}