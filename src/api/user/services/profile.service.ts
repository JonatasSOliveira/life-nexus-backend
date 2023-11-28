import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { UserRepository } from 'src/database/repositories/user-repository';

@Injectable()
export class ProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(user: Prisma.UserCreateInput): Promise<User> {
    return this.userRepository.create(user);
  }
}
