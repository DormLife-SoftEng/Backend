import * as mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
  reviewId: { type: String },
  dorm: {
    dormName: {type: String},
    dormId: {type: String},
    reviewCode: {type: String}
  },
  user: {
    userId: { type: String },
  },
  star: { type: Number },
  comment: { type: String },
  image: { type: [String] },
  createdOn: { type: Date },
});

export interface Review extends mongoose.Document {
  id: string;
  dorm: {
      dormName: string,
      dormId: string,
      reviewCode: string
  };
  user: {
      userId: string
  };
  star: number;
  comment: string;
  image: [string];
  createdOn: Date;
}
