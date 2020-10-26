import * as mongoose from 'mongoose';
import { DormSchema } from '../dorm/dorm.model';
import { UserDocument } from '../users/schemas/users.schemas';

export const LobbySchema = new mongoose.Schema({
  expireOn: { type: Date },
  dorm: String,
  room: String,
  owner: String,
  code: { type: String },
  member: { type: [{ user: String, ready: Boolean }] },
  blackList: { type: [{ user: String, message: String }] },
  maxMember: { type: Number },
  createdOn: { type: Date },
  modifiedOn: { type: Date },
  chat: { type: [{ user: String, message: String, time: Date }] },
});

export interface Lobby extends mongoose.Document {
  lobbyId: string;
  dorm: string;
  room: string;
  expireOn: Date;
  owner: string;
  code: string;
  member: [{ user: string; ready: boolean }];
  blackList: [{ user: string; message: string }];
  maxMember: number;
  createdOn: Date;
  modifiedOn: Date;
  chat: [{ user: string; message: string; time: Date }];
}
