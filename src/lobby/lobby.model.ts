import * as mongoose from 'mongoose';
<<<<<<< HEAD
import { DormSchema } from '../dorm/dorm.model';
import { User, UserDocument } from '../users/schemas/users.schemas';
=======
import { DormSchema } from '../Dorm/dorm.model';
import { UserDocument } from '../users/schemas/users.schemas';
>>>>>>> finishing get post lobby

export const LobbySchema = new mongoose.Schema({
  expireOn: { type: Date },
  dorm: DormSchema,
  owner: {},
<<<<<<< HEAD
  code: { type: String },
  member: { type: [{ user: {}, ready: Boolean }] },
  blackList: { type: [{ user: {}, message: String }] },
  maxMember: { type: Number },
  createdOn: { type: Date },
  modifiedOn: { type: Date },
  chat: { type: [{ user: {}, message: String, time: Date }] },
=======
  member: { type: [] },
  maxMember: { type: Number },
  createdOn: { type: Date },
  modifiedOn: { type: Date },
>>>>>>> finishing get post lobby
});

export interface Lobby extends mongoose.Document {
  lobbyId: string;
  expireOn: Date;
  owner: UserDocument;
<<<<<<< HEAD
  code: string;
  member: [{ user: UserDocument; ready: boolean }];
  blackList: [{ user: UserDocument; message: string }];
  maxMember: number;
  createdOn: Date;
  modifiedOn: Date;
  chat: [{ user: UserDocument; message: string; time: Date }];
=======
  member: UserDocument[];
  maxMember: number;
  createdOn: Date;
  modifiedOn: Date;
>>>>>>> finishing get post lobby
}
