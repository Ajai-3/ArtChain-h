import { Artwork } from "../entities/artwork.entity";
export interface IArtworkRepository {
  create(artwork: Artwork): Promise<Artwork>;
  findById(id: string): Promise<Artwork | null>;
}