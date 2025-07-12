import { MongoClient } from 'mongodb';
import { Artwork } from "../../1-domine/entities/artwork.entity";
import { IArtworkRepository } from "../../1-domine/repositories/artwork.repository";

export class MongoArtworkRepository implements IArtworkRepository {
  constructor(private readonly client: MongoClient) {}

  private get collection() {
    return this.client.db('artdb').collection<Artwork>('artworks');
  }

  async create(artwork: Artwork): Promise<Artwork> {
    await this.collection.insertOne(artwork);
    return artwork;
  }

  async findById(id: string): Promise<Artwork | null> {
    return this.collection.findOne({ _id: id });
  }

  async findByUser(userId: string): Promise<Artwork[]> {
    return this.collection.find({ userId }).toArray();
  }

  async update(id: string, updates: Partial<Artwork>): Promise<Artwork | null> {
    const result = await this.collection.findOneAndUpdate(
      { _id: id },
      { $set: { ...updates, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    return result.value;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  async search(query: string, tags: string[] = []): Promise<Artwork[]> {
    const searchFilter = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ],
      ...(tags.length > 0 && { tags: { $in: tags } })
    };
    return this.collection.find(searchFilter).toArray();
  }

  async incrementSoldCopies(id: string): Promise<void> {
    await this.collection.updateOne(
      { _id: id },
      { $inc: { soldCopies: 1 }, $set: { updatedAt: new Date() } }
    );
  }

  // Implement other methods...
}