import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() bto: AuthDto) {
    return this.authService.signup(bto);
  }

  @Post('signin')
  login(@Req() res: Request) {
    console.log('res', res);
    // Implement login logic here
    return this.authService.signin();
  }
}
