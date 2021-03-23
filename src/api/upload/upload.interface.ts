import { Document } from 'mongoose';

export interface IUpload extends Document {
  readonly path: string;
}
