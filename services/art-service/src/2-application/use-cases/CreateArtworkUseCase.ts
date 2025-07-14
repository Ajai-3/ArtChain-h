import { Artwork, ArtworkInput } from "../../1-domine/entities/artwork.entity";
import { IArtworkRepository } from "../../1-domine/repositories/artwork.repository";

export class CreateArtworkUseCase {
  constructor(private readonly repository: IArtworkRepository) {}

  async execute(input: ArtworkInput): Promise<Artwork> {
    const artwork = Artwork.create(input);
    return this.repository.create(artwork);
  }
}