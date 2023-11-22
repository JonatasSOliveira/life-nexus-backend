import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.prismaService.user.findFirst({
      where: { email: email, password: password },
    });

    if (!user) {
      return new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return { acess_token: await this.jwtService.signAsync(payload) };
  }
}
