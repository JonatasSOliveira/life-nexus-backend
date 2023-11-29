import {
  Body,
  HttpCode,
  HttpStatus,
  Post,
  Controller,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInRequestDto } from '../dtos/requests/sign-in.dto';
import { SignUpRequestDTO } from '../dtos/requests/sign-up.dto';
import { AcessTokenReponseDTO } from '../dtos/responses/acess-token.dto';
import { Public } from '../decorators/public.decorator';
import { PrismaClientKnownRequestErrorFilter } from 'src/database/exceptions/prisma-client-known-request-error.filter';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInRequestDto): Promise<AcessTokenReponseDTO> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('sign-up')
  @UseFilters(PrismaClientKnownRequestErrorFilter)
  signUp(@Body() signUpDto: SignUpRequestDTO): Promise<AcessTokenReponseDTO> {
    return this.authService.signUp(signUpDto);
  }
}
