import { Artwork } from "../../1-domine/entities/artwork.entity";
import { IArtworkRepository } from "../../1-domine/repositories/artwork.repository";

export class CreateArtwork {
  constructor(private readonly repository: IArtworkRepository) {}

  async execute(input: unknown): Promise<Artwork> {
    
    const artwork = new Artwork(
      crypto.randomUUID(),
      validated.userId,
      validated.title,
      validated.description,
      validated.tags || [],
      validated.images,
      validated.nsfw || false,
      validated.price !== undefined,
      validated.artType || 'digital',
      validated.price || 0
    );

    return this.repository.create(artwork);
  }
}