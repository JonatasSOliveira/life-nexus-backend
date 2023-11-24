import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string): Promise<User> {
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async create(user: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data: user });
  }
}
