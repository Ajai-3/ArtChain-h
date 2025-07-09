// src/1-domine/repositories/IAdminRepositories.ts
import { User } from "../entities/User";
import { PaginationOptions, PaginatedResult } from "../common/types";

export interface IAdminRepository {
  // Paginated methods
  countAllUsers(): Promise<number>;
  getAllUsers(options: PaginationOptions): Promise<PaginatedResult<User>>;
  
  // CRUD operations
  save(user: User): Promise<User>;
  create(user: User): Promise<User>;
  editUser(user: User): Promise<User>;
  findOneById(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  findOneByUsername(username: string): Promise<User | null>;
  
  // Admin specific
  bannUser(id: string): Promise<User>;
  suspendUser(id: string): Promise<User>;
}