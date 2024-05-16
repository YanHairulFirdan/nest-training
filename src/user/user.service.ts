import { Inject, Injectable } from "@nestjs/common";
import { CustomPrismaService } from "nestjs-prisma";
import { ExtendedPrismaClient } from "src/prisma/extension";
import * as bcrypt from 'bcrypt';

type CreateUser = {
  email: string,
  password: string,
  name: string
}

@Injectable()
export default class UserService {
  @Inject('PrismaService')
  private prisma: CustomPrismaService<ExtendedPrismaClient>

  async createUser(data: CreateUser) {
    data.password = await this.hashPassword(data.password);

    return this.prisma.client.user.create({ data });
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }
}