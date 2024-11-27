import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    // generate the password hash

    try {
      const hash = await argon.hash(dto.password);
      // save the user db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
        },
      });

      console.log('user', user);

      return { msg: 'I have signed up', data: user };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }

      throw error;
    }
  }

  signin() {
    return { msg: 'I have logged in' };
  }
}
