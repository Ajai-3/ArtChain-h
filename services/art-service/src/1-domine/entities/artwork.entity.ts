import { ObjectId } from 'mongodb';

export class Artwork {
  constructor(
    public _id: ObjectId,
    public userId: string,
    public title: string,
    public description: string = '',
    public tags: string[] = [],
    public images: string[] = [],
    public nsfw: boolean = false,
    public isCollectible: boolean = false,
    public artType: string = 'digital',
    public price: number = 0,
    public downloadAccess: boolean = false,
    public isCommentEnabled: boolean = true,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  static create(input: ArtworkInput): Artwork {
    return new Artwork(
      new ObjectId(),
      input.userId,
      input.title,
      input.description,
      input.tags,
      input.images,
      input.nsfw,
      input.isCollectible,
      input.artType,
      input.price,
      input.downloadAccess,
      input.isCommentEnabled
    );
  }
}

export interface ArtworkInput {
  userId: string;
  title: string;
  description?: string;
  tags?: string[];
  images: string[];
  nsfw?: boolean;
  isCollectible?: boolean;
  artType?: string;
  price?: number;
  downloadAccess?: boolean;
  isCommentEnabled?: boolean;
}