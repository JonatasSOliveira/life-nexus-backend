import { Body, HttpCode, HttpStatus, Post, Controller } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInRequestDto } from '../dtos/requests/sign-in.dto';
import { SignUpRequestDTO } from '../dtos/requests/sign-up.dto';
import { AcessTokenReponseDTO } from '../dtos/responses/acess-token.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInRequestDto): Promise<AcessTokenReponseDTO> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpRequestDTO): Promise<AcessTokenReponseDTO> {
    return this.authService.signUp(signUpDto);
  }
}
