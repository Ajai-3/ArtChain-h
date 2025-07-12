import { Purchase } from "../entities/purchase.entity";

export interface IPurchaseRepository {
  create(purchase: Purchase): Promise<Purchase>;
  findByBuyer(buyerId: string): Promise<Purchase[]>;
  findByArtwork(artworkId: string): Promise<Purchase[]>;
}