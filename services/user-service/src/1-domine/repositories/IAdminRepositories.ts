import { User } from "../entities/User";

export interface IAdminRepository {
  save(user: User): Promise<User>;
  create(user: User): Promise<User>;
  findOneById(id: string): Promise<User | undefined>;
  findOneByEmail(email: string): Promise<User | undefined>;
  findOneByUsername(username: string): Promise<User | undefined>;
}
