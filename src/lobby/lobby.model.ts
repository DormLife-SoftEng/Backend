import * as mongoose from 'mongoose';
import { DormSchema } from '../Dorm/dorm.model';
import { User, UserDocument } from '../users/schemas/users.schemas';

export const LobbySchema = new mongoose.Schema({
  expireOn: { type: Date },
  dorm: DormSchema,
  owner: {},
  code: { type: String },
  member: { type: [{
      user: User,
      ready: Boolean
  }] },
  maxMember: { type: Number },
  createdOn: { type: Date },
  modifiedOn: { type: Date },
});

export interface Lobby extends mongoose.Document {
  lobbyId: string;
  expireOn: Date;
  owner: UserDocument;
  code: string;
  member: [{
      user: UserDocument,
      ready: boolean
  }];
  maxMember: number;
  createdOn: Date;
  modifiedOn: Date;
}
