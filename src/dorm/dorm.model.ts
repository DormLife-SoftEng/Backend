import * as mongoose from 'mongoose';
import { UserDocument } from '../users/schemas/users.schemas';

enum approval {
  'approved',
  'disapproved',
  'pending',
}

export const utilSchema = new mongoose.Schema({
  type: { type: String },
  distance: { type: Number },
  description: { type: String },
});

export const RoomSchema = new mongoose.Schema({
  name: { type: String },
  capacity: { type: Number },
  image: { type: [String] },
  bathroom: { type: Number },
  aircond: { type: Number },
  kitchen: { type: Number },
  bedroom: { type: Number },
  description: { type: String },
  price: {
    amount: { type: Number },
    pricePer: { type: Number },
  },
  allowedSex: { type: String, enum: ['any', 'male', 'female'] },
});

var contactSchema = new mongoose.Schema({
  telephone: { type: String },
  email: { type: String },
  lineID: { type: String },
  website: { type: String },
});

export const DormSchema = new mongoose.Schema({
  name: { type: String },
  code: { type: String },
  owner: {type: String }, //userId
  contact: contactSchema,
  address: {
    address: { type: String },
    coordinate: {
      type: [Number],
    },
  },
  utility: [utilSchema],
  type: { type: String },
  description: { type: String },
  room: [RoomSchema],
  allowedSex: { type: String },
  avgStar: { type: Number },
  image: {type:[String]},
  license: { type: [String] },
  createdOn: { type: Date },
  modifiedOn: { type: Date },
  approved: {
    type: String,
    enum: ['approved', 'disapproved', 'pending'],
    index: true,
    default: 'pending',
  },
  approvedOn: { type: Date },
});

export interface UtilityInterface extends mongoose.Document {
  type: string;
  distance: number;
  description: string;
}

export interface UtilityInterface extends mongoose.Document {
  type: string;
  distance: number;
  description: string;
}

export interface RoomInterface extends mongoose.Document {
  id: string;
  name: string;
  capacity: number;
  image: string[];
  bathroom: number;
  aircond: number;
  kitchen: number;
  bedroom: number;
  description: string;
  price: {
    amount: number;
    pricePer: number;
  };
  allowedSex: string;
}

export interface Dorm extends mongoose.Document {
  id: string;
  name: string;
  owner: UserDocument;
  code: string;
  contact: {
    telephone: string;
    email: string;
    lineID: string;
    website: string;
  };
  address: {
    address: string;
    coordinate: number[];
  };
  utility: UtilityInterface[];
  room: RoomInterface[];
  allowedSex: string;
  type:string,
  avgStar: number;
  description:string,
  image:string[];
  license: string[];
  createdOn: Date;
  modifiedOn: Date;
  approved: approval;
  approvedOn: Date;
}

export interface DormAdd extends mongoose.Document {
  name: string;
  code: string;
  owner: UserDocument; //change to userschema here
  contact: {
    telephone: string;
    email: string;
    lineID: string;
    website: string;
  };
  address: {
    address: string;
    coordinate: { type: 'Point'; coordinates: number[] };
  };
  utility: Array<UtilityInterface>;
  room: Array<RoomInterface>;
  allowedSex: string;
  avgStar: number;
  license: string[];
}

export interface DormQuery extends mongoose.Document {
  name: string;
  address: {
    address: string;
    coordinate: [Number];
  };
  utility: Array<UtilityInterface>;
  room: Array<RoomInterface>;
  allowedSex: string;
}
