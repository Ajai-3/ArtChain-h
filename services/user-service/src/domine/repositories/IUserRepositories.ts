import { User } from "../entities/user";

export interface IUserRepository {
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | undefined>;
    findOneByUsername(username: string): Promise<User | undefined>;
    findOneByEmail(email: string): Promise<User | undefined>;
    update(user: User): Promise<User>;
    delete(user: User): Promise<void>;
    findUsersByRole(role: "user" | "artist" | "admin"): Promise<User[]>;
    findUsersByStatus(status: "banned" | "suspended" | "active" | "deleted"): Promise<User[]>;
    findUsersByCountry(country: string): Promise<User[]>;
    findUsersByCreatedAt(createdAt: Date): Promise<User[]>; 
    findUsersByUpdatedAt(updatedAt: Date): Promise<User[]>;
    findUsersByIsVerified(isVerified: boolean): Promise<User[]>;
}