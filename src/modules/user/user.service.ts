import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/providers/database/prisma/extenstions/extension';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

type CreateUser = {
  email: string;
  password: string;
  name: string;
};

type RegisterUser = {
  email: string;
  password: string;
};

type LoginUser = {
  access_token: string;
};

@Injectable()
export default class UserService {
  @Inject('PrismaService')
  private prisma: CustomPrismaService<ExtendedPrismaClient>;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  async createUser(data: CreateUser) {
    data.password = await this.hashPassword(data.password);

    return this.prisma.client.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.client.user.findUnique({
      where: { email },
    });
  }

  async login(data: RegisterUser): Promise<string> {
    const user = await this.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.jwtService.sign({ id: user.id, email: user.email });
  }

  async verifyToken(token: string): Promise<User | null> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('auth.jwt_secret'),
    });

    return await this.findByEmail(payload.email);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }
}
