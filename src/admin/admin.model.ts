import * as mongoose from 'mongoose';

export const PendingActionSchema = new mongoose.Schema({
  target: {},
  newdata: {},
  createdOn: { type: Date },
  createdBy: {
    userId: { type: String },
    name: {
      firstname: { type: String },
      lastname: { type: String },
    },
    profilePic: { type: String },
  },
  status: { type: [String] },
});

export interface PendingAction extends mongoose.Document {
    target: any;
    newdata: any;
    createdOn: Date;
    createdBy: {
      userId: string,
      name: {
        firstname: string,
        lastname: string,
      },
      profilePic: string,
    },
    status: [string],
}
