import { Schema, model, Document } from 'mongoose';

interface IArtworkDocument extends Document {
  _id: string;
  userId: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  nsfw: boolean;
  isCollectible: boolean;
  artType: string;
  price: number;
  soldCopies: number;
  downloadAccess: boolean;
  isCommentEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ArtworkSchema = new Schema<IArtworkDocument>({
  _id: { type: String, required: true },
  userId: { type: String, required: true, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  tags: { type: [String], default: [] },
  images: { type: [String], required: true },
  nsfw: { type: Boolean, default: false },
  isCollectible: { type: Boolean, default: false },
  artType: { type: String, default: 'digital' },
  price: { type: Number, default: 0 },
  soldCopies: { type: Number, default: 0 },
  downloadAccess: { type: Boolean, default: false },
  isCommentEnabled: { type: Boolean, default: true }
}, {
  timestamps: true,
  _id: false // Since we're manually setting _id
});

export const ArtworkModel = model<IArtworkDocument>('Artwork', ArtworkSchema);