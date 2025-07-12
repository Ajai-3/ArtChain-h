import { Commission } from "../entities/commission.entity";

export interface ICommissionRepository {
  create(commission: Commission): Promise<Commission>;
  findById(id: string): Promise<Commission | null>;
  findByArtist(artistId: string): Promise<Commission[]>;
  findByRequester(requesterId: string): Promise<Commission[]>;
  updateStatus(id: string, status: Commission['status']): Promise<Commission | null>;
}