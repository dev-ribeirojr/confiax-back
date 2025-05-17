import { Controller, Post, Body } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { AuthHandler } from 'src/auth/handler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authHandler: AuthHandler) {}

  @Post('sign-in')
  login(@Body() authDto: AuthDto) {
    return this.authHandler.execute(authDto);
  }
}
