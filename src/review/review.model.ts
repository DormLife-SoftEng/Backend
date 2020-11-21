import * as mongoose from 'mongoose';
import { DormSchema, Dorm } from '../dorm/dorm.model';

export const ReviewSchema = new mongoose.Schema({
  reviewId: { type: String },
  dorm: DormSchema,
  user: {
    userId: { type: String },
  },
  star: { type: Number },
  comment: { type: String },
  image: { type: [String] },
}, {timestamps: {createdAt: 'createdOn', updatedAt: 'modifiedOn'}});

export interface ReviewPrimitive {
  dorm: Dorm;
  user: {
    userId: string;
  };
  star: number;
  comment: string;
  image: [string];
  createdOn: string;
}
export interface Review extends mongoose.Document {
  id: string;
  dorm: Dorm;
  user: {
    userId: string;
  };
  star: number;
  comment: string;
  image: [string];
  createdOn: string;
}
