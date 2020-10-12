import * as mongoose from 'mongoose';
import { DormSchema } from '../Dorm/dorm.model';

export const ReviewSchema = new mongoose.Schema({
  reviewId: { type: String },
  //   dorm: { type: mongoose.Schema.Types.ObjectId, ref: 'Dorm' },
  //   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dorm: {
    d: {type: String},
  },
  user: {
    u: { type: String },
  },
  star: { type: Number },
  comment: { type: String },
  image: { type: [String] },
  createdOn: { type: Date, default: Date.now },
});

export interface Review extends mongoose.Document {
  id: string;
  dorm: {
      d: string
  };
  user: {
      u: string
  };
  star: number;
  comment: string;
  image: [string];
  createdOn: Date;
}
