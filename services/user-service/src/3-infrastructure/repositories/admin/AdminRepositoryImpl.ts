import { prisma } from "../../database/prisma";
import { User } from "../../../1-domine/entities/User";
import { IAdminRepository } from './../../../1-domine/repositories/IAdminRepositories';

export class AdminRepositoryImpl implements IAdminRepository {
    async findOneById(id: string): Promise<User | undefined> {
        const user = await prisma.user.findUnique({ where: { id } });
    
        return user || undefined;
      }
      async findOneByUsername(username: string): Promise<User | undefined> {
        const user = await prisma.user.findUnique({
          where: { username },
        });
        return user || undefined;
      }
    
      async findOneByEmail(email: string): Promise<User | undefined> {
        const user = await prisma.user.findUnique({
          where: { email },
        });
        return user || undefined;
      }
    
      async create(user: User): Promise<User> {
        const createdUser = await prisma.user.create({
          data: {
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone.toString(),
            password: user.password,
            role: user.role,
            plan: user.plan,
            status: user.status,
            isVerified: user.isVerified,
            profileImage: user.profileImage,
            bannerImage: user.bannerImage,
            backgroundImage: user.backgroundImage,
            bio: user.bio,
            country: user.country,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });
        return createdUser as User;
      }
    
      async save(user: User): Promise<User> {
        if (!user.id) {
          return this.create(user);
        }
        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            password: user.password,
            role: user.role,
            plan: user.plan,
            status: user.status,
            isVerified: user.isVerified,
            profileImage: user.profileImage,
            bannerImage: user.bannerImage,
            backgroundImage: user.backgroundImage,
            bio: user.bio,
            country: user.country,
            updatedAt: new Date(),
          },
        });
        return updatedUser as User;
      }
}