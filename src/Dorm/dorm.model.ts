import * as mongoose from 'mongoose';

export const DormSchema = new mongoose.Schema({
  name: { type: String },
  code: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contact: {
    type: {
      telephone: { type: String },
      email: { type: String },
      lineID: { type: String },
      website: { type: String },
    },
  },
  address: {
    type: {
      address: { type: String },
      coordinate: {
        type: [
          {
            type: String,
            enum:['Point'],
          },
        ],
      },
    },
  },
  utility: [utilSchema],
  type: { type: String },
  description: { type: String },
  room: [RoomSchema],
  allowedSex: { type: String },
  avgStar: { type: Number },
  license: { type: [String] },
  createdOn: { type: Date },
  modifiedOn: { type: Date },
  approved: { type: String, enum: ['approved', 'disapproved', 'pending'] },
  approvedOn: { type: String },
});

var utilSchema = new mongoose.Schema({
  type: { type: String },
  distance: { type: Number },
  description: { type: String },
});

var RoomSchema = new mongoose.Schema({
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
  allowedSex: { type: String },
});

export interface DormQuery extends mongoose.Document {
  name: string;
  address: {
    address: string,
    coordinate: { type: 'Point', coordinates: [Number, Number] }
  };
  utility: [{
      type: string,
      distance: number,
      description: string
  }],
  room: RoomInterface
}

export interface RoomInterface {
    
}
export interface Dorm extends mongoose.Document {}
export interface DormAdd extends mongoose.Document {}
