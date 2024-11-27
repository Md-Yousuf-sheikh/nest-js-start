import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    try {
      // generate the password hash
      const hash = await argon.hash(dto.password);
      // save the user db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
        },
      });
      // return the user
      return { msg: 'I have signed up', data: user };
    } catch (error) {
      // check error P2002
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }
      // throw any other error
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    try {
      //  find the user by email
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      // if user does not exist throw exception
      if (!user) {
        throw new ForbiddenException('Invalid credentials');
      }

      //  compress the password hash
      const passwordMatch = await argon.verify(user.hash, dto.password);
      // if password incorrect throw exception

      if (!passwordMatch) {
        throw new ForbiddenException('Invalid credentials');
      }
      delete user.hash;
      // send back the user
      return { msg: 'I have logged in', data: user };
    } catch (error) {
      // check error P2002
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }
      // throw any other error
      throw error;
    }
  }
}
