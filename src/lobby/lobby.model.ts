import * as mongoose from 'mongoose';
import { DormSchema } from '../Dorm/dorm.model';
import { UserDocument } from '../users/schemas/users.schemas';

export const LobbySchema = new mongoose.Schema({
  expireOn: { type: Date },
  dorm: DormSchema,
  owner: {},
  member: { type: [] },
  maxMember: { type: Number },
  createdOn: { type: Date },
  modifiedOn: { type: Date },
});

export interface Lobby extends mongoose.Document {
  lobbyId: string;
  expireOn: Date;
  owner: UserDocument;
  member: UserDocument[];
  maxMember: number;
  createdOn: Date;
  modifiedOn: Date;
}
