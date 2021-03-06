import { Schema } from 'mongoose';

export const UploadSchema = new Schema({
  path: { type: String, required: true, unique: true },
  date: {
    type: Date,
    default: Date.now,
  },
});
