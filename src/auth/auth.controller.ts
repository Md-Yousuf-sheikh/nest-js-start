import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return this.authService.signup();
  }

  @Post('signin')
  login() {
    // Implement login logic here
    return this.authService.signin();
  }

  @Post('logout')
  logout() {
    // Implement logout logic here
  }

  @Post('refresh-token')
  refreshToken() {
    // Implement token refresh logic here
  }

  @Post('forgot-password')
  forgotPassword() {
    // Implement forgot password logic here
  }
}
