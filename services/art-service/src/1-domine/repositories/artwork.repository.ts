import { Artwork } from "../entities/artwork.entity";
export interface IArtworkRepository {
  create(artwork: Artwork): Promise<Artwork>;
  findById(id: string): Promise<Artwork | null>;
  findByUser(userId: string): Promise<Artwork[]>;
  update(id: string, updates: Partial<Artwork>): Promise<Artwork | null>;
  delete(id: string): Promise<boolean>;
  search(query: string, tags?: string[]): Promise<Artwork[]>;
}