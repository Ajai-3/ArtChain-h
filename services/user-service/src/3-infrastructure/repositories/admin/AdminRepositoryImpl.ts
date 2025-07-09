import { Prisma } from "@prisma/client";
import { prisma } from "../../database/prisma";
import { User } from "../../../1-domine/entities/User";
import {
  PaginationOptions,
  PaginatedResult,
} from "../../../1-domine/common/types";
import { IAdminRepository } from "../../../1-domine/repositories/IAdminRepositories";

export class AdminRepositoryImpl implements IAdminRepository {
  async countAllUsers(): Promise<number> {
    return await prisma.user.count();
  }

 async getAllUsers(options: PaginationOptions): Promise<PaginatedResult<User>> {
        const { page = 1, limit = 10, search, sortBy, sortOrder } = options;
        const skip = (page - 1) * limit;

        const where: Prisma.UserWhereInput = search ? {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { username: { contains: search, mode: 'insensitive' } }
            ]
        } : {};

        const orderBy: Prisma.UserOrderByWithRelationInput = sortBy ? { 
            [sortBy]: sortOrder || 'asc' 
        } : { createdAt: 'desc' };

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy
            }),
            prisma.user.count({ where })
        ]);

        return {
            data: users,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page < Math.ceil(total / limit),
                hasPreviousPage: page > 1
            }
        };
    }


  async findOneById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { username },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async create(user: User): Promise<User> {
    return await prisma.user.create({
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
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  }

  async save(user: User): Promise<User> {
    if (!user.id) {
      return this.create(user);
    }
    return await prisma.user.update({
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
  }

  async editUser(user: User): Promise<User> {
    return this.save(user);
  }

  async bannUser(id: string): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: { status: "banned" },
    });
  }

  async suspendUser(id: string): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: { status: "suspended" },
    });
  }

  async activateUser(id: string): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: { status: "active" },
    });
  }
}
