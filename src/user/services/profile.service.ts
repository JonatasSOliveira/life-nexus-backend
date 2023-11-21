import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  createUser(user: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: user });
  }
}
