import { IArtworkRepository } from "../../1-domine/repositories/artwork.repository";
import { Artwork } from "../../1-domine/entities/artwork.entity";

export class FetchArtworksUseCase {
  constructor(private artworkRepo: IArtworkRepository) {}

  async execute(lastId?: string): Promise<Artwork[]> {
    return await this.artworkRepo.fetchRecent(lastId);
  }
}