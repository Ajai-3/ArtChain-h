import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { Artwork } from "../../1-domine/entities/artwork.entity";
import { IArtworkRepository } from "../../1-domine/repositories/artwork.repository";

export class ArtRepositoryImpl implements IArtworkRepository {
 private get collection() {
    // The ! tells TypeScript we know it won't be undefined at runtime
    return mongoose.connection.db!.collection<Artwork>("artworks");
  }
  async create(artwork: Artwork): Promise<Artwork> {
    await this.collection.insertOne({
      _id: artwork._id,
      userId: artwork.userId,
      title: artwork.title,
      description: artwork.description,
      tags: artwork.tags,
      images: artwork.images,
      nsfw: artwork.nsfw,
      isCollectible: artwork.isCollectible,
      artType: artwork.artType,
      price: artwork.price,
      soldCopies: artwork.soldCopies,
      downloadAccess: artwork.downloadAccess,
      isCommentEnabled: artwork.isCommentEnabled,
      createdAt: artwork.createdAt,
      updatedAt: artwork.updatedAt,
    });
    return artwork;
  }

async findById(id: string): Promise<Artwork | null> {
  try {
    const objectId = new ObjectId(id);
    const result = await this.collection.findOne({ _id: objectId });
    return result as Artwork | null; 
  } catch (error) {
    return null;
  }
}  
}
