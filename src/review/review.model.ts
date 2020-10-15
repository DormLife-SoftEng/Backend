import * as mongoose from 'mongoose';
import { DormSchema, Dorm } from '../Dorm/dorm.model';
import { User, UserDocument } from '../users/schemas/users.schemas';

export const ReviewSchema = new mongoose.Schema({
  reviewId: { type: String },
  dorm: DormSchema,
  user: User,
  star: { type: Number },
  comment: { type: String },
  image: { type: [String] },
  createdOn: { type: Date },
});

export interface Review extends mongoose.Document {
  id: string;
  dorm: Dorm;
  user: UserDocument;
  star: number;
  comment: string;
  image: [string];
  createdOn: Date;
}
