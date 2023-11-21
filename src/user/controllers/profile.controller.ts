import { Body, Controller, Post } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { ProfileService } from '../services/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async createUser(@Body() user: Prisma.UserCreateInput): Promise<User> {
    return await this.profileService.createUser(user);
  }
}
