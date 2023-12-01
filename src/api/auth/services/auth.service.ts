import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { UserRepository } from 'src/database/repositories/user-repository';
import { User } from '@prisma/client';
import { encryptionConstants } from '../constants/encryption.constants';
import { SignUpRequestDTO } from '../dtos/requests/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  private async generateAccessToken(user: User): Promise<string> {
    const payload = { id: user.id, email: user.email };
    return await this.jwtService.signAsync(payload);
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ acess_token: string }> {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user || !(await this.verifyPassword(user, password))) {
      throw new UnauthorizedException();
    }

    return { acess_token: await this.generateAccessToken(user) };
  }

  async signUp({
    name,
    email,
    password,
  }: SignUpRequestDTO): Promise<{ acess_token: string }> {
    const user = await this.userRepository.create({
      name,
      email,
      password: await this.generateEncryptedPassword(password),
    });

    return { acess_token: await this.generateAccessToken(user) };
  }

  async generateEncryptedPassword(password: string): Promise<string> {
    const salt = randomBytes(8);
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(
      encryptionConstants.secret,
      salt,
      32,
    )) as Buffer;
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}:${salt.toString(
      'hex',
    )}`;
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    const [iv, encryptedPassword, salt] = user.password.split(':');
    const key = (await promisify(scrypt)(
      encryptionConstants.secret,
      Buffer.from(salt, 'hex'),
      32,
    )) as Buffer;
    const decipher = createDecipheriv(
      'aes-256-cbc',
      key,
      Buffer.from(iv, 'hex'),
    );
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedPassword, 'hex')),
      decipher.final(),
    ]);
    return decrypted.toString() === password;
  }
}
